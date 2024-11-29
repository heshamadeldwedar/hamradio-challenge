import { Injectable } from "@nestjs/common";
import { FirebaseService } from "@/firebase/firebase.service";
import { CallSignDto } from "@/call-sign/dto/call-sign.dto";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  writeBatch,
} from 'firebase/firestore/lite';
import { InjectModel } from "@nestjs/sequelize";
import { CallSignEntity } from "@/call-sign/entities/call-sign.entity";
import { CallsignBatchJobsEntity, CallSignBatchJobsDto } from "@/call-sign/entities/callsign-batch-jobs.entity";
import { Op } from "sequelize";

@Injectable()
export class CallSignRepository {

  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectModel(CallSignEntity)
    private readonly callSign: typeof CallSignEntity,
    @InjectModel(CallsignBatchJobsEntity)
    private readonly callSignBatchJobs: typeof CallsignBatchJobsEntity,
  ) {}

  async search(keyword: string) : Promise<CallSignDto | null> {
    try {
      const db = this.firebaseService.getDB();
      const callSignCollection = collection(db, 'CallsignTest');
      const callSignSearchQuery = await query(
        callSignCollection,
        where('callsign', '==', keyword),
      );
      const snapShot = await getDocs(callSignSearchQuery);
      if (snapShot.docs.length > 0) {
        return snapShot.docs[0].data() as CallSignDto;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getCallSignBatch() {

    let offset = 0;
    const limit = 5;

    return async () => {
      const callSignBatch = await this.callSign.findAll({
        offset,
        limit,
        raw: true,
      });
      offset += limit;
      return callSignBatch;
    };

  }

  async createInProgressBatches() {

    const batches = await this.getInProgressBatches();

    const db = this.firebaseService.getDB();
    const callSignCollection = collection(db, 'CallsignTest');

    for (const batch of batches) {

      const batchWrite = writeBatch(db);
      const callsigns = await this.callSign.findAll({
        where: {
          fccid: {
            [Op.in]: batch.fccids,
          },
        }
      });

      callsigns.forEach((callsign) => {
        const payload = {
          ...callsign.toJSON(),
          batch_checksum: batch.checksum,
        }
        const docRef = doc(callSignCollection);
        batchWrite.set(docRef, payload);
      });

      batchWrite.commit();

      batch.update({
        status: 'completed',
      });

      batch.save();
    }
  }

  async deleteDocumentsThatAreMarkedForDeletion() {
    const checksums = await this.getBatchesMarkedForDeletion();
    const db = this.firebaseService.getDB();
    const callSignCollection = collection(db, 'CallsignTest');
    const callSignQuery = await query(
      callSignCollection,
      where('batch_checksum', 'in', checksums),
    );
    const snapShot = await getDocs(callSignQuery);
    const batch = writeBatch(db);
    snapShot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    batch.commit();
    await this.callSignBatchJobs.destroy({
      where: {
        checksum: checksums,
      },
    });
  }

  

  async getBatchesMarkedForDeletion() {
    const result = await this.callSignBatchJobs.findAll({
      where: {
        status: 'marked-for-deletion',
      },
      raw: true,
    });
    return result.map((item) => item.checksum).flat();
  }

  async getInProgressBatches() {
    return await this.callSignBatchJobs.findAll({
      where: {
        status: 'in-progress',
      },
    });
  }


  createCallsignMigrationBatch (data: CallSignBatchJobsDto) {
    return this.callSignBatchJobs.findOrCreate({
      where: {
        checksum: data.checksum,
      }, 
      defaults: data,
    });
  }

  deleteOldHashes(newHashes: string[]) {
    return this.callSignBatchJobs.update({
      status: 'marked-for-deletion',
    }, {
      where: {
        checksum: {
          [Op.notIn]: newHashes,
        },
      },
    });
  }


}
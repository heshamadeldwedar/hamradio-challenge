import { Injectable } from "@nestjs/common";
import { FirebaseService } from "@/firebase/firebase.service";
import { CallSignDto } from "@/call-sign/dto/call-sign.dto";
import {
  collection,
  where,
  query,
  getDocs,
} from 'firebase/firestore/lite';
import { InjectModel } from "@nestjs/sequelize";
import { CallSignEntity } from "@/call-sign/entities/call-sign.entity";

@Injectable()
export class CallSignRepository {

  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectModel(CallSignEntity)
    private readonly callSign: typeof CallSignEntity
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

  async getCallSignBatch() {
    const callSigns = await this.callSign.findAll({
      limit: 100,
    });
    return callSigns;
  }

}
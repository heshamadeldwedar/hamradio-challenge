import { Injectable } from '@nestjs/common';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';
import  * as Crypto  from 'node:crypto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CallSignService {

  constructor(
        private readonly callSignRepo: CallSignRepository, 
        @InjectQueue('create-batch') private batchQueue: Queue,
        @InjectQueue('migrate-batch') private migrationQueue: Queue,
      ) {}

  async refreshFirestore () {
    await this.callSignRepo.markCompletedJobForDeletion();
    await this.callSignRepo.deleteDocumentsThatAreMarkedForDeletion();
  }

  async createBatches() {
    const next = this.callSignRepo.getCallSignBatch();
    let callSigns = [];
    let batchCount = 0;
    let recordsCount = 0;
    const migrations: Array<{ checksum: string, fccids: Array<string>}> = [];


    do {

      callSigns = await next();
      batchCount += 1;
      recordsCount += callSigns.length;


      const checksum = this.createChecksum(callSigns);
      this.batchQueue.add('create-batch', {
        checksum,
        fccids: callSigns.map((callSign) => callSign.fccid),
      });

    } while (callSigns.length > 0);


    return {
      batchCount,
      recordsCount,
      checksums: migrations,
    };
  }
  
  async migrateBatches() {

    const next = this.callSignRepo.getJobs();
    let jobs = [];
    let batchCount = 0;
    let recordsCount = 0;
    const migrations: Array<{ checksum: string, fccids: Array<string>}> = [];

    do {

      jobs = await next();
      batchCount += 1;
      recordsCount += jobs.length;

      this.migrationQueue.addBulk(jobs);

    } while (jobs.length > 0);


    return {
      batchCount,
      recordsCount,
      checksums: migrations,
    };
  }



  search(keyword: string) {
    return this.callSignRepo.search(keyword);
  }

  private createChecksum(data: any) {
    return Crypto.createHmac('sha256', '123').update(JSON.stringify(data)).digest('hex');
  }
}

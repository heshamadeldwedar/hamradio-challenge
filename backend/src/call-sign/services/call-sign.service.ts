import { Injectable } from '@nestjs/common';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';
import  * as Crypto  from 'node:crypto';
import { create } from 'node:domain';

@Injectable()
export class CallSignService {

  constructor(private readonly callSignRepo: CallSignRepository) {}

  async seed() {
    const next = this.callSignRepo.getCallSignBatch();
    let callSigns = [];
    let batchCount = 0;
    let recordsCount = 0;
    const migrations: Array<{ checksum: string, fccids: Array<string>}> = [];

    do {

      callSigns = await next();
      batchCount += 1;
      recordsCount += callSigns.length;
      migrations.push({
        checksum: this.createChecksum(callSigns),
        fccids: callSigns.map((callSign) => callSign.fccid),
      });

    } while (batchCount === 1);

    // mark any hashes that is not in the db as marked-for-deletion //
    await this.callSignRepo.deleteOldHashes(migrations.map((migration) => migration.checksum));

    const insertMigrations = migrations.map((migration) => {
      return this.callSignRepo.createCallsignMigrationBatch({ checksum: migration.checksum, fccids: migration.fccids });
    });

    await Promise.all(insertMigrations);

    await this.callSignRepo.deleteDocumentsThatAreMarkedForDeletion();

    // create ( in progress ) callsigns //
    await this.callSignRepo.createInProgressBatches();



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

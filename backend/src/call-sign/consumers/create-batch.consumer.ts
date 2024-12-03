import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { CallSignRepository } from "@/call-sign/repositories/call-sign.repository";

@Processor('create-batch')
export class CreateBatchConsumer extends WorkerHost{

    constructor(private readonly callSignRepo: CallSignRepository) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {

      const batch = await this.callSignRepo.createCallsignMigrationBatch({ ...job.data });
      if (batch.length > 0 && batch[0].status !== 'completed') {
        await this.callSignRepo.migrateSingleBatch(batch[0]);
      }
    }

}
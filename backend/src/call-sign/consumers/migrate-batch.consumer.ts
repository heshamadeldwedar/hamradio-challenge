import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { CallSignRepository } from "@/call-sign/repositories/call-sign.repository";

@Processor('migrate-batch')
export class MigrateBatchConsumer extends WorkerHost{

    constructor(private readonly callSignRepo: CallSignRepository) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {
      this.callSignRepo.migrateSingleBatch({ ...job.data });
    }

}
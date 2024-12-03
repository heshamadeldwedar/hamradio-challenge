import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { CallSignRepository } from "@/call-sign/repositories/call-sign.repository";

@Processor('create-batch')
export class CreateBatchConsumer extends WorkerHost{

    constructor(private readonly callSignRepo: CallSignRepository) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {
      this.callSignRepo.createCallsignMigrationBatch({ ...job.data });
    }

}
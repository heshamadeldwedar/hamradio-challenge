import { Module } from '@nestjs/common';
import { CallSignService } from '@/call-sign/services/call-sign.service';
import { CallSignController } from '@/call-sign/controllers/call-sign.controller';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';
import { FirebaseService } from '@/firebase/firebase.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallSignEntity } from '@/call-sign/entities/call-sign.entity';
import { CallsignBatchJobsEntity } from '@/call-sign/entities/callsign-batch-jobs.entity';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { CreateBatchConsumer } from '@/call-sign/consumers/create-batch.consumer';
import { MigrateBatchConsumer } from '@/call-sign/consumers/migrate-batch.consumer';



@Module({
  controllers: [CallSignController],
  providers: [FirebaseService, CallSignService, CallSignRepository, CreateBatchConsumer, MigrateBatchConsumer],
  imports: [
    SequelizeModule.forFeature([CallSignEntity, CallsignBatchJobsEntity]),
    BullModule.registerQueue(
      {
        name: 'create-batch',
      },
      {
        name: 'migrate-batch',
      },
    ),
    BullBoardModule.forFeature(
      {
        name: 'create-batch',
        adapter: BullMQAdapter,
      },
      {
        name: 'migrate-batch',
        adapter: BullMQAdapter
      }
    )
  ]
})
export class CallSignModule {}

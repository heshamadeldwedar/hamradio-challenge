import { Module } from '@nestjs/common';
import { LogBookContactsModule } from '@/log-book-contacts/log-book-contacts.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CallSignModule } from './call-sign/call-sign.module';
import configurations from '@/config/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallSignEntity } from '@/call-sign/entities/call-sign.entity';
import { CallsignBatchJobsEntity } from '@/call-sign/entities/callsign-batch-jobs.entity';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from "@bull-board/express";


console.log('REDIS: ', process.env.REDIS_HOST, process.env.REDIS_PORT);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configurations],
    }),
    SequelizeModule.forRoot({
      logging: false,
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [CallSignEntity, CallsignBatchJobsEntity],
    }),
    BullModule.forRoot({
      connection: {
        url: `redis://hamradio-redis:6379`,
        maxRetriesPerRequest: 5000,
      }
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    LogBookContactsModule,
    FirebaseModule,
    CallSignModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

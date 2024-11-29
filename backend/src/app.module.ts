import { Module } from '@nestjs/common';
import { LogBookContactsModule } from '@/log-book-contacts/log-book-contacts.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { CallSignModule } from './call-sign/call-sign.module';
import configurations from '@/config/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallSignEntity } from '@/call-sign/entities/call-sign.entity';
import { CallsignBatchJobsEntity } from '@/call-sign/entities/callsign-batch-jobs.entity';

console.log('the value of db name: ', process.env.DB_NAME);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    LogBookContactsModule,
    FirebaseModule,
    CallSignModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [CallSignEntity, CallsignBatchJobsEntity],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

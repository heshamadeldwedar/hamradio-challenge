import { Module } from '@nestjs/common';
import { LogBookContactsModule } from '@/log-book-contacts/log-book-contacts.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { CallSignModule } from './call-sign/call-sign.module';
import configurations from '@/config/configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallSignEntity } from '@/call-sign/entities/call-sign.entity';

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
      host: 'hamradio-db',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'fcc_amateur',
      models: [CallSignEntity],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

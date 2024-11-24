import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { LogBookContactsModule } from '@/log-book-contacts/log-book-contacts.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import configurations from '@/config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    LogBookContactsModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

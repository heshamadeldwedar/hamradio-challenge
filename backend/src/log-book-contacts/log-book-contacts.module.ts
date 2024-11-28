import { Module } from '@nestjs/common';
import { LogBookContactsService } from '@/log-book-contacts/services/log-book-contacts.service';
import { LogBookContactsController } from '@/log-book-contacts/controllers/log-book-contacts.controller';
import { FirebaseService } from '@/firebase/firebase.service';

@Module({
  controllers: [LogBookContactsController],
  providers: [LogBookContactsService, FirebaseService],
  imports: [],
})
export class LogBookContactsModule {}

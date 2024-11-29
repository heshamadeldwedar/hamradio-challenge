import { Module } from '@nestjs/common';
import { LogBookContactsService } from '@/log-book-contacts/services/log-book-contacts.service';
import { LogBookContactsController } from '@/log-book-contacts/controllers/log-book-contacts.controller';
import { FirebaseService } from '@/firebase/firebase.service';
import { LogBookContactsRepository } from '@/log-book-contacts/repositories/log-book-contacts.repository';

@Module({
  controllers: [LogBookContactsController],
  providers: [LogBookContactsService, FirebaseService, LogBookContactsRepository],
  imports: [],
})
export class LogBookContactsModule {}

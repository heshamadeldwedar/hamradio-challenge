import { Module } from '@nestjs/common';
import { CallSignService } from '@/call-sign/services/call-sign.service';
import { CallSignController } from '@/call-sign/controllers/call-sign.controller';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';
import { FirebaseService } from '@/firebase/firebase.service';

@Module({
  controllers: [CallSignController],
  providers: [FirebaseService, CallSignService, CallSignRepository],
})
export class CallSignModule {}

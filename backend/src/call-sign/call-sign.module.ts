import { Module } from '@nestjs/common';
import { CallSignService } from '@/call-sign/services/call-sign.service';
import { CallSignController } from '@/call-sign/controllers/call-sign.controller';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';
import { FirebaseService } from '@/firebase/firebase.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CallSignEntity } from '@/call-sign/entities/call-sign.entity';


@Module({
  controllers: [CallSignController],
  providers: [FirebaseService, CallSignService, CallSignRepository],
  imports: [
    SequelizeModule.forFeature([CallSignEntity]),
  ]
})
export class CallSignModule {}

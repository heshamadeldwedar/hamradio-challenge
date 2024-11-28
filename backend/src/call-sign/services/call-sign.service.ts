import { Injectable } from '@nestjs/common';
import { CallSignRepository } from '@/call-sign/repositories/call-sign.repository';

@Injectable()
export class CallSignService {

  constructor(private readonly callSignRepo: CallSignRepository) {}

  seed() {
    return this.callSignRepo.getCallSignBatch();
  }

  search(keyword: string) {
    return this.callSignRepo.search(keyword);
  }
}

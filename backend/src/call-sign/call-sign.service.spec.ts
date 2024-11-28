import { Test, TestingModule } from '@nestjs/testing';
import { CallSignService } from './services/call-sign.service';

describe('CallSignService', () => {
  let service: CallSignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallSignService],
    }).compile();

    service = module.get<CallSignService>(CallSignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

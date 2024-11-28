import { Test, TestingModule } from '@nestjs/testing';
import { CallSignController } from './call-sign.controller';
import { CallSignService } from '../services/call-sign.service';

describe('CallSignController', () => {
  let controller: CallSignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallSignController],
      providers: [CallSignService],
    }).compile();

    controller = module.get<CallSignController>(CallSignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

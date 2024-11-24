import { Test, TestingModule } from '@nestjs/testing';
import { LogBookContactsController } from './log-book-contacts.controller';
import { LogBookContactsService } from '../services/log-book-contacts.service';

describe('LogBookContactsController', () => {
  let controller: LogBookContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogBookContactsController],
      providers: [LogBookContactsService],
    }).compile();

    controller = module.get<LogBookContactsController>(
      LogBookContactsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

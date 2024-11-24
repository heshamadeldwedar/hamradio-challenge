import { Test, TestingModule } from '@nestjs/testing';
import { LogBookContactsService } from './services/log-book-contacts.service';

describe('LogBookContactsService', () => {
  let service: LogBookContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogBookContactsService],
    }).compile();

    service = module.get<LogBookContactsService>(LogBookContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

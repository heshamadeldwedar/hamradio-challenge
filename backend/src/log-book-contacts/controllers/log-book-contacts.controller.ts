import { Controller, Get, Query } from '@nestjs/common';

import { LogBookContactsService } from '@/log-book-contacts/services/log-book-contacts.service';
import { GetCountPerDayValidation } from '@/log-book-contacts/validations/get-count-per-day.validation';

@Controller('log-book-contacts')
export class LogBookContactsController {
  constructor(
    private readonly logBookContactsService: LogBookContactsService,
  ) {}

  
  @Get('/count-per-day')
  getCountPerDay(@Query() query: GetCountPerDayValidation) {
    return this.logBookContactsService.getCountPerDay(query);
  }
}

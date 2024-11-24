import { Controller, Get, Param } from '@nestjs/common';

import { LogBookContactsService } from './log-book-contacts.service';

@Controller('log-book-contacts')
export class LogBookContactsController {
  constructor(
    private readonly logBookContactsService: LogBookContactsService,
  ) {}

  @Get()
  findAll() {
    return this.logBookContactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logBookContactsService.findOne(+id);
  }
}

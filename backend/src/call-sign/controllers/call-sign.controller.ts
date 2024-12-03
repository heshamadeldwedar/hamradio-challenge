import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallSignService } from '../services/call-sign.service';

@Controller('call-sign')
export class CallSignController {
  constructor(private readonly callSignService: CallSignService) {}

  @Post('/seed')
  create() {
    return this.callSignService.createBatches();
  }

  @Post('/refresh')
  refresh() {
    return this.callSignService.refreshFirestore();
  }

  @Post('/migrate')
  migrate() {
    return this.callSignService.migrateBatches();
  }


  @Get('/search/:keyword')
  fuzzySearch(@Param('keyword') keyword: string) {
    return this.callSignService.search(keyword);
  }

}

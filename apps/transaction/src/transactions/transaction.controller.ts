import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { transactionervice } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: transactionervice) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getByExternalId(id);
  }
}
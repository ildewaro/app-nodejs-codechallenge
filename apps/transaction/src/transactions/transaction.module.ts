import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { transactionervice } from './transaction.service';
import { PrismaService } from '../common/prisma.service';
import { KafkaProducer } from '../common/kafka.producer';

@Module({
  controllers: [TransactionController],
  providers: [transactionervice, PrismaService, KafkaProducer],
})
export class TransactionModule {}
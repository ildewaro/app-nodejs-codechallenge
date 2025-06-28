import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { KafkaProducer } from './common/kafka.producer';
import { PrismaService } from './common/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, KafkaProducer],
})
export class TransactionModule { }

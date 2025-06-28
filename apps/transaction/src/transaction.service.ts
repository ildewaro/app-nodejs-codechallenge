import { Injectable } from '@nestjs/common';
import { KafkaProducer } from './common/kafka.producer';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { PrismaService } from './common/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly db: PrismaService,
    private readonly kafka: KafkaProducer,
  ) { }

  async create(dto: CreateTransactionDto) {
    const transaction = await this.db.transaction.create({
      data: {
        accountExternalIdDebit: dto.accountExternalIdDebit,
        accountExternalIdCredit: dto.accountExternalIdCredit,
        transferTypeId: dto.transferTypeId,
        value: dto.value,
        status: 'pending',
      },
    });

    try {
      const result = await this.kafka.emit('transaction.created', transaction);
      console.log('✅ Kafka result:', result);
    } catch (err) {
      console.error('❌ Kafka send error:', err);
    }

    return transaction;
  }

  async getByExternalId(id: string) {
    return this.db.transaction.findUnique({
      where: { transactionExternalId: id },
    });
  }
}

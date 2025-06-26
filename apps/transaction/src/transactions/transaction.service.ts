import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../common/prisma.service';
import { KafkaProducer } from '../common/kafka.producer';

@Injectable()
export class transactionervice {
  constructor(
    private readonly db: PrismaService,
    private readonly kafka: KafkaProducer,
  ) {}

  async create(dto: any) {
    const transaction = await this.db.transaction.create({
      data: {
        transactionExternalId: uuid(),
        accountExternalIdDebit: dto.accountExternalIdDebit,
        accountExternalIdCredit: dto.accountExternalIdCredit,
        transferTypeId: dto.transferTypeId,
        value: dto.value,
        status: 'pending',
      },
    });
    await this.kafka.emit('transaction.created', transaction);
    return transaction;
  }

  async getByExternalId(id: string) {
    return this.db.transaction.findUnique({
      where: { transactionExternalId: id },
    });
  }
}
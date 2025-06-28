import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { KafkaProducer } from './common/kafka.producer';

@Injectable()
export class AntifraudService {
  constructor(private readonly kafka: KafkaProducer) {}

  async validateTransaction(@Payload() data: any) {
    const { transactionExternalId, value } = data;
    const status = value > 1000 ? 'rejected' : 'approved';
    console.log(`🔎 Validando transacción: ${transactionExternalId}, valor: ${value} → ${status.toUpperCase()}`);
    const resp = await this.kafka.emit('transaction.status', {
      transactionExternalId,
      status,
    });
    console.log('sent transaction.status', resp);
  }
}

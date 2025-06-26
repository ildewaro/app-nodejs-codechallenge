import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaProducer } from './common/kafka.producer';

@Injectable()
export class AntifraudService {
  constructor(private readonly kafka: KafkaProducer) {}

  @EventPattern('transaction.created')
  async handle(@Payload() message: any) {
    const status = message.value.value > 1000 ? 'rejected' : 'approved';
    await this.kafka.emit('transaction.status', {
      transactionExternalId: message.value.transactionExternalId,
      status,
    });
  }
}
import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller()
export class KafkaConsumerController {
  constructor(private readonly prisma: PrismaService) {}
  
  @EventPattern('transaction.status')
  async handleStatusUpdate(@Payload() data: any) {
    const { transactionExternalId, status } = data;

    console.log(`📥 Recibido estado: ${status} para transacción ${transactionExternalId}`);

    try {
      await this.prisma.transaction.update({
        where: { transactionExternalId },
        data: { status },
      });
      console.log(`✅ Transacción ${transactionExternalId} actualizada a ${status}`);
    } catch (error) {
      console.error(`❌ Error actualizando transacción:`, error);
    }
  }
}

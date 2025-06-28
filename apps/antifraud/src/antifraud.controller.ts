import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AntifraudService } from './antifraud.service';

@Controller()
export class AntifraudController {
  constructor(private readonly antifraudService: AntifraudService) {}

  @EventPattern('transaction.created')
  async handleTransactionCreated(@Payload() data: any) {
    console.log('📥 Mensaje recibido en antifraud:', data);
    await this.antifraudService.validateTransaction(data);
  }
}

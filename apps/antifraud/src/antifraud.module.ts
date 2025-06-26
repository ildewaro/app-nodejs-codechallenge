import { Controller, Get, Module } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';
import { KafkaModule } from './common/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [AntifraudService],
})

@Controller()
export class HealthController {
  @Get('ping')
  ping() {
    return { status: 'ok', service: 'antifraud' };
  }
}

export class AntifraudModule {}
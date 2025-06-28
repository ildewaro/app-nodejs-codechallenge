import { Controller, Get, Module } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';
import { KafkaModule } from './common/kafka.module';
import { AntifraudController } from './antifraud.controller';

@Module({
  imports: [KafkaModule],
  controllers: [AntifraudController], 
  providers: [AntifraudService],
})

export class AntifraudModule {}
import { Module } from '@nestjs/common';
import { KafkaProducer } from './kafka.producer';
import { KafkaConsumerController } from './kafka.consumer.controller';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KafkaProducer],
  controllers: [KafkaConsumerController],
})
export class KafkaModule { }

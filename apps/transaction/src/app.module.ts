import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './common/kafka.module';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [ConfigModule.forRoot(), TransactionModule, KafkaModule],
})
export class AppModule {}
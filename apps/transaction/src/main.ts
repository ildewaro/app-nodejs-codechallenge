import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction.module';
import { PrismaClient } from '@prisma/client';
import { KafkaModule } from './common/kafka.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [TransactionModule, KafkaModule],
})
class AppModule { }

async function bootstrap() {
  const prisma = new PrismaClient();
  await prisma.$connect();
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transaction-client',
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'transaction-consumer', 
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

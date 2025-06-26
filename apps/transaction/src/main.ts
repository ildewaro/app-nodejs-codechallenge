import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [TransactionModule],
})
class AppModule {}

async function bootstrap() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

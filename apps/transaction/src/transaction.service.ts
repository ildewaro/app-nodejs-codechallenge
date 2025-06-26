import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.transaction.create({ data });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }
}

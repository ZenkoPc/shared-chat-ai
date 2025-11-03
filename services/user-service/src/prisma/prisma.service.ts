import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger: Logger;

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
    this.logger = new Logger('PrismaService');
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to the database');
    } catch (err) {
      this.logger.error('Failed to connect to the database: ', err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

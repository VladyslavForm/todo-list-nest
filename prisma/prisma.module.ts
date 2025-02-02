import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.sevice';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

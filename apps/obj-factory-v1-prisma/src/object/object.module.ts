import { Module } from '@nestjs/common';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ObjectController],
  providers: [ObjectService],
})
export class ObjectModule {}

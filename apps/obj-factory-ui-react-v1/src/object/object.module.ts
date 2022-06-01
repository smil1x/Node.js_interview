import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { ObjectRepository } from './repositories/object.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectRepository])],
  controllers: [ObjectController],
  providers: [ObjectService],
})
export class ObjectModule {}

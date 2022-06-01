import { Module } from '@nestjs/common';
import { ObjectsService } from './object.service';
import { ObjectsController } from './object.controller';
import { ObjectDao } from './object-dao';

@Module({
  controllers: [ObjectsController],
  providers: [ObjectsService, ObjectDao],
})
export class ObjectModule {}

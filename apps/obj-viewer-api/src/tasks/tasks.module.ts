import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ObjectRepository } from '../object/object.repository';
import { RequestService } from '../core/services';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectRepository])],
  controllers: [TasksController],
  providers: [TasksService, RequestService],
})
export class TasksModule {}

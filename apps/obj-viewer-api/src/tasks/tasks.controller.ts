import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { ResponseError } from '../core/models';
import { HttpExceptionFilter } from '@app/common/exception-filter';
import { CreateTaskDto } from './dto';
import { CreateTaskResponse } from '../core/models';
import { TaskBodyParametersGuard } from './guards';
import { ObjectExistGuard } from '../core/guards';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tasks')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error.',
  type: ResponseError,
})
@ApiBadRequestResponse({ description: 'Bad Request.', type: ResponseError })
@ApiBearerAuth(JWT_STRATEGY)
@ApiBearerAuth(AZURE_STRATEGY)
@UseGuards(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
@UseFilters(HttpExceptionFilter)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(ObjectExistGuard, TaskBodyParametersGuard)
  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiOkResponse({
    description: 'The task has been successfully executed.',
    type: CreateTaskResponse,
  })
  @HttpCode(HttpStatus.OK)
  async createTasks(@Body() dto: CreateTaskDto) {
    return this.tasksService.creatTask(dto);
  }
}

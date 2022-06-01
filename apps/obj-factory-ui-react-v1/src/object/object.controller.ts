import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseUUIDPipe,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ObjectEntity } from './entities/object.entity';
import { PaginationQuery } from './dto/queries/pagination.query';
import { GetAllResponse } from '../core/models/get-all-response.model';
import { ResponseError } from '../core/models/response-error.model';
import { HttpExceptionFilter } from '../core/exception-filter/http-exception.filter';

@ApiTags('Objects')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error.',
  type: ResponseError,
})
@ApiBadRequestResponse({ description: 'Bad Request.', type: ResponseError })
@ApiForbiddenResponse({
  description: 'Forbidden.',
  type: ResponseError,
})
@UseFilters(HttpExceptionFilter)
@Controller('objects')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create new object' })
  @ApiCreatedResponse({
    description: 'The object has been successfully created.',
    type: ObjectEntity,
  })
  createObject(
    @Body() createObjectDto: CreateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.createObject(createObjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all objects' })
  @ApiOkResponse({
    description: 'Objects have been successfully retrieved',
    type: GetAllResponse,
  })
  getAllObjects(
    @Query()
    query: PaginationQuery,
  ): Promise<GetAllResponse<ObjectEntity>> {
    const { page, pageSize } = query;
    return this.objectService.getAllObjects(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully retrieved',
    type: ObjectEntity,
  })
  getObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ObjectEntity> {
    return this.objectService.getObject(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully updated',
    type: ObjectEntity,
  })
  patchUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.patchUpdateObject(id, updateObjectDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully replaced',
    type: ObjectEntity,
  })
  putUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createObjectDto: CreateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.putUpdateObject(id, createObjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiNoContentResponse({
    description: 'Object has been successfully deleted.',
  })
  @ApiOkResponse({
    description: 'The object has been successfully deleted',
    type: ObjectEntity,
  })
  deleteObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Partial<ObjectEntity>> {
    return this.objectService.deleteObject(id);
  }
}

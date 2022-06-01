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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ObjectsService } from './object.service';
import { CreateObjectDto, UpdateObjectDto, ObjectPaginationQuery } from './dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectEntity } from './object.entity';
import { HttpExceptionFilter } from '@app/common/exception-filter';
import { objNotFoundMsg } from '@app/common/utils';
import { ResponseError, FindAllResponse } from '../core/models';

@ApiTags('Objects')
@Controller('objects')
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
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The object has been successfully created.',
    type: ObjectEntity,
  })
  @ApiOperation({ summary: 'Create new object' })
  create(@Body() createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectsService.create(createObjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all objects' })
  @ApiOkResponse({
    description: 'Objects have been successfully retrieved',
    type: FindAllResponse,
  })
  findAll(@Query() paginationQuery: ObjectPaginationQuery): Promise<FindAllResponse<ObjectEntity>> {
    return this.objectsService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiNotFoundResponse({
    description: 'Object with this uuid is not found.',
    type: ResponseError,
  })
  @ApiOperation({ summary: 'Get object' })
  @ApiOkResponse({
    description: 'The object has been successfully retrieved',
    type: ObjectEntity,
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const retrievedObject = await this.objectsService.findOne(id);

    if (!retrievedObject) throw new NotFoundException(objNotFoundMsg(id));

    return retrievedObject;
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'Object with this uuid is not found.',
    type: ResponseError,
  })
  @ApiOperation({ summary: 'Update object' })
  @ApiOkResponse({
    description: 'The object has been successfully updated',
    type: ObjectEntity,
  })
  async patchUpdate(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateObjectDto: UpdateObjectDto,
  ) {
    if (Object.keys(updateObjectDto).length === 0)
      throw new BadRequestException('No parameters to make updates, please fill at least one field');

    const updatedObject = await this.objectsService.patchUpdate(id, updateObjectDto);

    if (!updatedObject) throw new NotFoundException(objNotFoundMsg(id));

    return updatedObject;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace object' })
  @ApiNotFoundResponse({
    description: 'Object with this uuid is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully replaced',
    type: ObjectEntity,
  })
  putUpdate(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() createObjectDto: CreateObjectDto) {
    return this.objectsService.putUpdate(id, createObjectDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: 'Object with this uuid is not found.',
    type: ResponseError,
  })
  @ApiNoContentResponse({
    description: 'Object has been successfully deleted.',
  })
  @ApiOkResponse({
    description: 'The object has been successfully deleted',
    type: ObjectEntity,
  })
  @ApiOperation({ summary: 'Delete object' })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const removedObject = await this.objectsService.remove(id);
    if (!removedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return removedObject;
  }
}

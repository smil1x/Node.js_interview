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
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
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
import { ObjectPostDto, ObjectPatchDto, ObjectPaginationQuery, BaseObjectResponse } from './dto';
import { ResponseError, GetAllResponse } from '../core/models';
import { HttpExceptionFilter } from '@app/common/exception-filter';
import { objNotFoundMsg } from '@app/common/utils';

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
@UseInterceptors(ClassSerializerInterceptor)
@Controller('objects')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create new object' })
  @ApiCreatedResponse({
    description: 'The object has been successfully created.',
    type: BaseObjectResponse,
  })
  createObject(@Body() dto: ObjectPostDto): Promise<BaseObjectResponse> {
    return this.objectService.createObject(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all objects' })
  @ApiOkResponse({
    description: 'Objects have been successfully retrieved',
    type: GetAllResponse,
  })
  getAllObjects(
    @Query()
    query: ObjectPaginationQuery,
  ): Promise<GetAllResponse<BaseObjectResponse>> {
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
    type: BaseObjectResponse,
  })
  async getObject(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<BaseObjectResponse> {
    const retrievedObject = await this.objectService.getObject(id);

    if (!retrievedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return retrievedObject;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully updated',
    type: BaseObjectResponse,
  })
  async patchUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ObjectPatchDto,
  ): Promise<BaseObjectResponse> {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('No parameters to make updates, please fill at least one field');
    }
    const updatedObject = await this.objectService.patchUpdateObject(id, dto);

    if (!updatedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return updatedObject;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully replaced',
    type: BaseObjectResponse,
  })
  async putUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ObjectPostDto,
  ): Promise<BaseObjectResponse> {
    const updatedObject = await this.objectService.putUpdateObject(id, dto);

    if (!updatedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return updatedObject;
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
    type: BaseObjectResponse,
  })
  async deleteObject(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<BaseObjectResponse> {
    const deletedObject = await this.objectService.deleteObject(id);

    if (!deletedObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return deletedObject;
  }
}

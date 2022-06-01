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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
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
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ObjectService } from './services';
import { ObjectEntity } from '@app/common/db/entities';
import {
  CreateObjectDto,
  UpdateObjectDto,
  UpdateContentDto,
  FieldsKeyValue,
  ObjectPaginationQuery,
  ObjectContentPaginationQuery,
  CreateObjectResponse,
  GetObjectContentResponse,
  DeleteObjectContentRowResponse,
} from './dto';
import { GetAllResponse, ResponseError } from '../core/models';
import { HttpExceptionFilter } from '@app/common/exception-filter';
import { MAX_FIELDS_UPDATE_AMOUNT } from '../core/constants';
import { ContentRowExistGuard, ObjectExistGuard } from '../core/guards';
import { AZURE_STRATEGY, JWT_STRATEGY } from '@app/auth';
import { AuthGuard } from '@nestjs/passport';

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
@ApiBearerAuth(JWT_STRATEGY)
@ApiBearerAuth(AZURE_STRATEGY)
@UseGuards(AuthGuard([JWT_STRATEGY, AZURE_STRATEGY]))
@UseFilters(HttpExceptionFilter)
@Controller('objects')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @ApiOperation({ summary: 'Create new object' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The object has been successfully created.',
    type: CreateObjectResponse,
  })
  async createObject(
    @Body() createObjectDto: CreateObjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateObjectResponse> {
    return this.objectService.createObject(createObjectDto, file);
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
  ): Promise<GetAllResponse<ObjectEntity>> {
    const { page, pageSize } = query;
    return this.objectService.getAllObjects(page, pageSize);
  }

  @UseGuards(ObjectExistGuard)
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
  getObject(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<ObjectEntity> {
    return this.objectService.getObject(id);
  }

  @UseGuards(ObjectExistGuard)
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

  @UseGuards(ObjectExistGuard)
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
    @Body() updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.putUpdateObject(id, updateObjectDto);
  }

  @UseGuards(ObjectExistGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'The object has been successfully deleted',
    type: ObjectEntity,
  })
  deleteObject(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Partial<ObjectEntity>> {
    return this.objectService.deleteObject(id);
  }

  @UseGuards(ObjectExistGuard)
  @Get(':id/content')
  @ApiOperation({ summary: 'Get object content' })
  @ApiOkResponse({
    description: 'Object content has been successfully retrieved',
    type: GetObjectContentResponse,
  })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  getObjectContent(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query()
    query: ObjectContentPaginationQuery,
  ): Promise<GetObjectContentResponse> {
    const { page, pageSize } = query;
    return this.objectService.getObjectContent(id, page, pageSize);
  }

  @UseGuards(ObjectExistGuard, ContentRowExistGuard)
  @Patch(':id/content')
  @ApiOperation({ summary: 'Update content field' })
  @ApiOkResponse({
    description: 'Content field was successfully updated',
    type: [FieldsKeyValue],
  })
  updateContent(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<FieldsKeyValue[]> {
    if (updateContentDto.fields.length === 0)
      throw new BadRequestException('There is have to be at least one field for content update');

    if (updateContentDto.fields.length > MAX_FIELDS_UPDATE_AMOUNT)
      throw new BadRequestException(`You can't update more than ${MAX_FIELDS_UPDATE_AMOUNT} fields in a row`);

    return this.objectService.updateContent(id, updateContentDto);
  }

  @UseGuards(ObjectExistGuard, ContentRowExistGuard)
  @Delete(':id/content/:contentId')
  @ApiOperation({ summary: 'Delete object content row' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'Object content row has been successfully deleted.',
    type: DeleteObjectContentRowResponse,
  })
  deleteContentRow(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('contentId') contentId: string,
  ): Promise<DeleteObjectContentRowResponse> {
    return this.objectService.deleteContentRow(id, contentId);
  }
}

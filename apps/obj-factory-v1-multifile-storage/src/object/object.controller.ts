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
  UploadedFiles,
  UseGuards,
  BadRequestException,
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
  getSchemaPath,
  ApiExtraModels,
  refs,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ObjectService } from './object.service';
import { ObjectEntity } from './object.entity';
import {
  ObjectPostDto,
  ObjectPatchDto,
  ObjectPutDto,
  FilesPostJsonDto,
  FilesPostFormDataDto,
  GetPresignedUrlsResponse,
  UploadFilesToBucketResponse,
  GetAllFilesResponse,
  GetFileResponse,
  DeleteFileResponse,
  ObjectPaginationQuery,
  FilesPaginationQuery,
} from './dto';
import { GetAllResponse, ResponseError } from '../core/models';
import { HttpExceptionFilter } from '@app/common/exception-filter';
import { FilesSizeLimitInterceptor } from '../core/interceptors';
import { DefineBodyType } from './decorators';
import { FileExistGuard, ObjectExistGuard } from '../core/guards';
import { AuthGuard } from '@nestjs/passport';
import { OBJECT_UUID_VERSION, USER_ID_FIELD } from '../core/constants';
import { AZURE_STRATEGY, JWT_STRATEGY, User } from '@app/auth';

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

  @Post()
  @ApiOperation({ summary: 'Create new object' })
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'Object has been successfully created.',
    type: ObjectEntity,
  })
  createObject(@Body() dto: ObjectPostDto, @User(USER_ID_FIELD) userId: string): Promise<ObjectEntity> {
    return this.objectService.createObject(dto, userId);
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
    description: 'Object has been successfully retrieved',
    type: ObjectEntity,
  })
  getObject(@Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string): Promise<ObjectEntity> {
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
    description: 'Object has been successfully updated',
    type: ObjectEntity,
  })
  patchUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
    @Body() dto: ObjectPatchDto,
    @User(USER_ID_FIELD) userId: string,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('No parameters to make updates, please fill at least one field');
    }

    return this.objectService.patchUpdateObject(id, dto, userId);
  }

  @UseGuards(ObjectExistGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Replace object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'Object has been successfully replaced',
    type: ObjectEntity,
  })
  putUpdateObject(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
    @Body() dto: ObjectPutDto,
    @User(USER_ID_FIELD) userId: string,
  ): Promise<ObjectEntity> {
    return this.objectService.putUpdateObject(id, dto, userId);
  }

  @UseGuards(ObjectExistGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete object' })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  @ApiOkResponse({
    description: 'Object has been successfully deleted',
    type: ObjectEntity,
  })
  deleteObject(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
  ): Promise<Partial<ObjectEntity>> {
    return this.objectService.deleteObject(id);
  }

  @UseGuards(ObjectExistGuard)
  @Post(':id/files')
  @UseInterceptors(FilesInterceptor('files'), FilesSizeLimitInterceptor)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiExtraModels(FilesPostFormDataDto, FilesPostJsonDto, UploadFilesToBucketResponse, GetPresignedUrlsResponse)
  @ApiOperation({
    summary: 'Upload files',
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: { $ref: getSchemaPath(FilesPostFormDataDto) },
        },
        'application/json': {
          schema: { $ref: getSchemaPath(FilesPostJsonDto) },
        },
      },
    },
  })
  @ApiCreatedResponse({
    schema: {
      anyOf: refs(UploadFilesToBucketResponse, GetPresignedUrlsResponse),
    },
  })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  async uploadFiles(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION }))
    id: string,
    @DefineBodyType({ formDataType: FilesPostFormDataDto, jsonType: FilesPostJsonDto })
    dto,
    @UploadedFiles() uploadedFiles: Express.Multer.File[],
    @User(USER_ID_FIELD) userId: string,
  ) {
    return uploadedFiles
      ? this.objectService.uploadFilesToBucket(id, uploadedFiles, userId)
      : this.objectService.getPresignedUrl(id, dto, userId);
  }

  @UseGuards(ObjectExistGuard)
  @Get(':id/files')
  @ApiOperation({ summary: 'Get all files' })
  @ApiOkResponse({
    description: 'Files have been successfully retrieved',
    type: GetAllFilesResponse,
  })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  getAllFiles(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
    @Query()
    query: FilesPaginationQuery,
  ): Promise<GetAllFilesResponse> {
    const { page, pageSize, presignedUrl } = query;
    return this.objectService.getAllFiles(id, page, pageSize, presignedUrl);
  }

  @UseGuards(ObjectExistGuard, FileExistGuard)
  @Get(':id/files/:fileName')
  @ApiOperation({ summary: 'Get file' })
  @ApiOkResponse({
    description: 'File has been successfully retrieved',
    type: GetFileResponse,
  })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  getFile(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
    @Param('fileName') fileName: string,
    @User(USER_ID_FIELD) userId: string,
  ): Promise<GetFileResponse> {
    return this.objectService.getFile(id, fileName, userId);
  }

  @UseGuards(ObjectExistGuard, FileExistGuard)
  @Delete(':id/files/:fileName')
  @ApiOperation({ summary: 'Delete file' })
  @ApiOkResponse({
    description: 'File has been successfully deleted.',
    type: DeleteFileResponse,
  })
  @ApiNotFoundResponse({
    description: 'Object with this id is not found.',
    type: ResponseError,
  })
  deleteFile(
    @Param('id', new ParseUUIDPipe({ version: OBJECT_UUID_VERSION })) id: string,
    @Param('fileName') fileName: string,
    @User(USER_ID_FIELD) userId: string,
  ): Promise<DeleteFileResponse> {
    return this.objectService.deleteFile(id, fileName, userId);
  }
}

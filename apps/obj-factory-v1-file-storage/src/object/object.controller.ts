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
  ApiNoContentResponse,
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
  ObjectContentPaginationQuery,
  ObjectPaginationQuery,
  CreateObjectResponse,
  GetObjectContentResponse,
} from './dto';
import { GetAllResponse, ResponseError } from '../core/models';
import { HttpExceptionFilter } from '@app/common/exception-filter';
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
  createObject(
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
    @Body() updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.putUpdateObject(id, updateObjectDto);
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
  deleteObject(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Partial<ObjectEntity>> {
    return this.objectService.deleteObject(id);
  }

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
}

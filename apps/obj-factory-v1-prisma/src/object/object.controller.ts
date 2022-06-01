import { Controller, Get, Post, Delete, Body, Param, Put, Query, HttpStatus } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto, BaseObjectResponse, GetObjectsResponse } from './dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Objects')
@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @ApiOperation({ summary: 'Create object' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: BaseObjectResponse,
  })
  @Post()
  postObject(@Body() dto: CreateObjectDto) {
    return this.objectService.addObject(dto);
  }

  @ApiOperation({ summary: 'Get object by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: BaseObjectResponse,
  })
  @Get('/:objectId')
  getObject(@Param('objectId') objectId: string) {
    return this.objectService.getObjectById(objectId);
  }

  @ApiOperation({ summary: 'Delete object by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: BaseObjectResponse,
  })
  @Delete('/:objectId')
  removeObject(@Param('objectId') objectId: string) {
    return this.objectService.removeObject(objectId);
  }

  @ApiOperation({ summary: 'Update object by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: BaseObjectResponse,
  })
  @Put('/:objectId')
  updateObject(@Param('objectId') objectId: string, @Body() dto: CreateObjectDto) {
    return this.objectService.updateObject(objectId, dto);
  }

  @ApiOperation({ summary: 'Get objects' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: GetObjectsResponse,
  })
  @Get()
  getObjects(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.objectService.getObjects(page, pageSize);
  }
}

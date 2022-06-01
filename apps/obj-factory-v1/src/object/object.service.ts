import { Injectable } from '@nestjs/common';
import { FindAllResponse } from '../core/models';
import { ObjectDao } from './object-dao';
import { CreateObjectDto, UpdateObjectDto, ObjectPaginationQuery } from './dto';
import { ObjectEntity } from './object.entity';

@Injectable()
export class ObjectsService {
  constructor(private readonly objectsDAO: ObjectDao) {}

  async create(createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectsDAO.create(createObjectDto);
  }

  async findAll(paginationQuery: ObjectPaginationQuery): Promise<FindAllResponse<ObjectEntity>> {
    const { pageSize, page } = paginationQuery;
    const { rows: retrievedObjects, total } = await this.objectsDAO.findAll(paginationQuery);
    return {
      pageSize: pageSize || 0,
      page: page || 0,
      total,
      data: retrievedObjects,
    };
  }

  async findOne(id: string): Promise<ObjectEntity> {
    return this.objectsDAO.findOne(id);
  }

  async patchUpdate(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    return this.objectsDAO.patchUpdate(id, updateObjectDto);
  }

  async putUpdate(id: string, createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectsDAO.putUpdate(id, createObjectDto);
  }

  async remove(id: string): Promise<ObjectEntity> {
    return this.objectsDAO.remove(id);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectEntity } from '@app/common/db/entities';
import { ObjectRepository } from './object.repository';
import { CreateObjectDto, UpdateObjectDto } from './dto';
import { GetAllResponse } from '../core/models';

@Injectable()
export class ObjectService {
  constructor(private objectRepository: ObjectRepository) {}

  async createObject(createObjectDto: CreateObjectDto): Promise<Partial<ObjectEntity>> {
    return this.objectRepository.createObject(createObjectDto);
  }

  async getAllObjects(page: number, pageSize: number): Promise<GetAllResponse<ObjectEntity>> {
    const [objectsList, total] = await this.objectRepository.getAllObjects(page, pageSize);

    return {
      total,
      page,
      pageSize,
      data: objectsList,
    };
  }

  async getObject(id: string): Promise<ObjectEntity> {
    return this.objectRepository.getObject(id);
  }

  async patchUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    if (Object.keys(updateObjectDto).length === 0)
      throw new BadRequestException('No parameters to make updates, please fill at least one field');

    return this.objectRepository.patchUpdateObject(id, updateObjectDto);
  }

  async putUpdateObject(id: string, createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectRepository.putUpdateObject(id, createObjectDto);
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    return this.objectRepository.deleteObject(id);
  }
}

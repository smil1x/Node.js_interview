import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectEntity } from './entities/object.entity';
import { ObjectRepository } from './repositories/object.repository';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { GetAllResponse } from '../core/models/get-all-response.model';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async createObject(createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectRepository.createObject(createObjectDto);
  }

  async getAllObjects(
    page: number,
    pageSize: number,
  ): Promise<GetAllResponse<ObjectEntity>> {
    const [objectsList, total] = await this.objectRepository.getAllObjects(
      page,
      pageSize,
    );

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

  async patchUpdateObject(
    id: string,
    updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    if (Object.keys(updateObjectDto).length === 0)
      throw new BadRequestException(
        'No parameters to make updates, please fill at least one field',
      );

    return this.objectRepository.patchUpdateObject(id, updateObjectDto);
  }

  async putUpdateObject(
    id: string,
    createObjectDto: CreateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectRepository.putUpdateObject(id, createObjectDto);
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    return this.objectRepository.deleteObject(id);
  }
}

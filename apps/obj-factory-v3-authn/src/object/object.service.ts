import { Injectable } from '@nestjs/common';
import { ObjectEntity } from './object.entity';
import { ObjectPostDto, ObjectPatchDto, BaseObjectResponse } from './dto';
import { GetAllResponse } from '../core/models';
import { DEFAULT_PAGE_NUMBER, OBJECT_BASE_ENTITY } from '../core/constants';
import { ObjectRepository } from './object.repository';

@Injectable()
export class ObjectService {
  constructor(private objectRepository: ObjectRepository) {}

  async createObject(dto: ObjectPostDto): Promise<BaseObjectResponse> {
    const newObject = this.objectRepository.create(dto);
    return this.objectRepository.save(newObject);
  }

  async getAllObjects(page: number, pageSize: number): Promise<GetAllResponse<BaseObjectResponse>> {
    const skip = (page - DEFAULT_PAGE_NUMBER) * pageSize;
    const [objectsList, total] = await this.objectRepository.findAndCount({
      skip,
      take: pageSize,
      select: OBJECT_BASE_ENTITY as (keyof ObjectEntity)[],
    });

    return {
      total,
      page,
      pageSize,
      data: objectsList,
    };
  }

  async getObject(id: string): Promise<BaseObjectResponse> {
    return await this.objectRepository.findOne({
      select: OBJECT_BASE_ENTITY as (keyof ObjectEntity)[],
      where: {
        id,
      },
    });
  }

  async patchUpdateObject(id: string, updateObjectDto: ObjectPatchDto): Promise<BaseObjectResponse> {
    return this.objectRepository.updateObject(id, updateObjectDto);
  }

  async putUpdateObject(id: string, dto: ObjectPostDto): Promise<BaseObjectResponse> {
    const foundObject = await this.getObject(id);
    return this.objectRepository.save(Object.assign(foundObject, dto));
  }

  async deleteObject(id: string): Promise<BaseObjectResponse> {
    return this.objectRepository.deleteObject(id);
  }
}

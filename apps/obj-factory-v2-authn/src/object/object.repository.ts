import { EntityRepository, Repository } from 'typeorm';
import { ObjectEntity } from '@app/common/db/entities';
import { NotFoundException } from '@nestjs/common';
import { CreateObjectDto, UpdateObjectDto } from './dto';
import { OBJECT_BASE_ENTITY, DEFAULT_PAGE_NUMBER } from '../core/constants';
import { objNotFoundMsg } from '@app/common/utils';
import { pick } from 'lodash';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {
  async createObject(createObjectDto: CreateObjectDto): Promise<Partial<ObjectEntity>> {
    const newObject = this.create(createObjectDto);
    const savedObject = await this.save(newObject);
    return pick(savedObject, OBJECT_BASE_ENTITY);
  }

  async getAllObjects(page: number, pageSize: number) {
    const skip = (page - DEFAULT_PAGE_NUMBER) * pageSize;
    return this.findAndCount({
      skip,
      take: pageSize,
    });
  }

  async getObject(id: string): Promise<ObjectEntity> {
    const foundObject = await this.findOne(id);
    if (!foundObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }
    return foundObject;
  }

  async patchUpdateObject(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    const updateResult = await this.update(id, {
      ...updateObjectDto,
      updatedAt: new Date(),
    });

    if (!updateResult.affected) {
      throw new NotFoundException(objNotFoundMsg(id));
    }

    return this.getObject(id);
  }

  async putUpdateObject(id: string, createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    const foundObject = await this.getObject(id);
    if (!foundObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }

    const objectToUpdate = Object.assign(foundObject, createObjectDto);
    return this.save(objectToUpdate);
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    const foundObject = await this.getObject(id);
    if (!foundObject) {
      throw new NotFoundException(objNotFoundMsg(id));
    }

    const deletedObject = await this.remove(foundObject);
    return { ...deletedObject, id };
  }
}

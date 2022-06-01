import { EntityRepository, Repository } from 'typeorm';
import { ObjectEntity } from '../entities/object.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateObjectDto } from '../dto/create-object.dto';
import { UpdateObjectDto } from '../dto/update-object.dto';
import { DEFAULT_PAGE_NUMBER } from '../../core/constants';
import { setNotFoundMsg } from '../../core/utils';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {
  async createObject(createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    const newObject = this.create(createObjectDto);
    return this.save(newObject);
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
      throw new NotFoundException(setNotFoundMsg(id));
    }
    return foundObject;
  }

  async patchUpdateObject(
    id: string,
    updateObjectDto: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    const updateResult = await this.update(id, {
      ...updateObjectDto,
      updatedAt: new Date(),
    });

    if (!updateResult.affected) {
      throw new NotFoundException(setNotFoundMsg(id));
    }

    return this.getObject(id);
  }

  async putUpdateObject(
    id: string,
    createObjectDto: CreateObjectDto,
  ): Promise<ObjectEntity> {
    const foundObject = await this.getObject(id);
    if (!foundObject) {
      throw new NotFoundException(setNotFoundMsg(id));
    }

    const objectToUpdate = Object.assign(foundObject, createObjectDto);
    return this.save(objectToUpdate);
  }

  async deleteObject(id: string): Promise<Partial<ObjectEntity>> {
    const foundObject = await this.getObject(id);
    if (!foundObject) {
      throw new NotFoundException(setNotFoundMsg(id));
    }

    const deletedObject = await this.remove(foundObject);
    return { ...deletedObject, id };
  }
}

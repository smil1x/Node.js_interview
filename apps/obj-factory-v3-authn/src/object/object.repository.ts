import { EntityRepository, Repository } from 'typeorm';
import { ObjectEntity } from './object.entity';
import { ObjectPatchDto } from './dto';
import { plainToClass } from 'class-transformer';
import { OBJECT_BASE_ENTITY } from '../core/constants';

@EntityRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {
  async updateObject(id: string, dto: ObjectPatchDto): Promise<ObjectEntity> {
    return this.createQueryBuilder()
      .update(ObjectEntity)
      .set({ ...dto, updatedAt: () => 'current_timestamp(0)' })
      .where('"objectId" = :id', { id })
      .returning(OBJECT_BASE_ENTITY)
      .execute()
      .then((result) => plainToClass(ObjectEntity, result.raw[0]));
  }

  async deleteObject(id: string): Promise<ObjectEntity> {
    return this.createQueryBuilder()
      .delete()
      .from(ObjectEntity)
      .where('"objectId" = :id', { id })
      .returning(OBJECT_BASE_ENTITY)
      .execute()
      .then((result) => plainToClass(ObjectEntity, result.raw[0]));
  }
}

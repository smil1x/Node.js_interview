import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AbstractObjectEntity } from './abstract-object.entity';

@Entity('object')
export class ObjectEntity extends AbstractObjectEntity {
  @Exclude()
  metadata: Record<string, any> | null;

  @Exclude()
  createdBy: string | null;

  @Exclude()
  updatedBy: string | null;
}

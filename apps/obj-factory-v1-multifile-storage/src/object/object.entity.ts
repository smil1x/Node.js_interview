import { Column, Entity, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('object')
export class ObjectEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'objectId',
  })
  id: string;

  @Column('character varying', {
    name: 'name',
    nullable: true,
    length: 256,
  })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', {
    name: 'tags',
    nullable: true,
    array: true,
  })
  tags: string[] | null;

  @Column('jsonb', { name: 'metadata', nullable: true })
  metadata: Record<string, any> | null;

  @Column('integer', {
    name: 'versionNumber',
    nullable: true,
    default: () => '0',
  })
  versionNumber: number | null;

  @ApiHideProperty()
  @Column('character varying', {
    name: 'createdBy',
    nullable: true,
    length: 256,
  })
  createdBy: string | null;

  @Column({
    name: 'createdAt',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Date;

  @ApiHideProperty()
  @Column('character varying', {
    name: 'updatedBy',
    nullable: true,
    length: 256,
  })
  updatedBy: string | null;

  @Column({
    name: 'updatedAt',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Date;

  @ApiHideProperty()
  @Column('jsonb', {
    name: 'content',
    nullable: true,
    select: false,
  })
  content: Record<string, any>[] | null;

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date(new Date().setMilliseconds(0));
  }

  constructor(partial: Partial<ObjectEntity>) {
    Object.assign(this, partial);
  }
}

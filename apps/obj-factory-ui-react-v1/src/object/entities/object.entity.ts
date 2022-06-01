import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('object')
export class ObjectEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'objectId',
  })
  id: string;

  @Column('character varying', { name: 'name', nullable: true, length: 256 })
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

  @Column('character varying', {
    name: 'createdBy',
    nullable: true,
    length: 256,
  })
  createdBy: string | null;

  @Column({
    name: 'createdAt',
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Column('character varying', {
    name: 'updatedBy',
    nullable: true,
    length: 256,
  })
  updatedBy: string | null;

  @Column({
    name: 'updatedAt',
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column('jsonb', { name: 'content', nullable: true })
  content: Record<string, any>[] | null;

  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = new Date();
  }

  constructor(id: string, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description || '';
  }
}

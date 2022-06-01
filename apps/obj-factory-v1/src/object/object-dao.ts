import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { EntityDao } from '../core/dao';
import { setUpdateQuery } from '../core/utils';
import { PG_CONNECTION } from '../core/constants';
import { CreateObjectDto, UpdateObjectDto, ObjectPaginationQuery } from './dto';
import { ObjectEntity } from './object.entity';

@Injectable()
export class ObjectDao implements EntityDao<CreateObjectDto | UpdateObjectDto, ObjectEntity, ObjectPaginationQuery> {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async create(createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    const query = `
          INSERT INTO object(
          name, description, "createdAt", "updatedAt") 
          VALUES($1, $2, $3, $4) 
          RETURNING*`;

    const timestamp = new Date();
    const values = [...Object.values(createObjectDto), timestamp, timestamp];

    const { rows } = await this.pool.query(query, values);

    return rows[0];
  }

  async findAll({ pageSize, page }: ObjectPaginationQuery) {
    const queryValues: number[] = [];
    let limitQuery = '';
    let offsetQuery = '';

    if (pageSize) {
      limitQuery = `LIMIT $1`;
      queryValues.push(pageSize);
    }

    if (page && pageSize) {
      offsetQuery = 'OFFSET $2';
      queryValues.push(page);
    }

    if (page && !pageSize) {
      offsetQuery = 'OFFSET $1';
      queryValues.push(page);
    }

    const query = `
      SELECT *
      FROM object 
      ${limitQuery} ${offsetQuery}`;

    const totalCountQuery = `
    SELECT COUNT(*) 
    FROM object`;

    const { rows } = await this.pool.query(query, queryValues);
    const { rows: total } = await this.pool.query(totalCountQuery);
    return { rows, total: +total[0].count };
  }

  async findOne(id: string): Promise<ObjectEntity> {
    const query = `
      SELECT * 
      FROM object 
      WHERE "objectId" = $1`;

    const { rows } = await this.pool.query(query, [id]);

    return rows[0];
  }

  async patchUpdate(id: string, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    const values = { updatedAt: new Date(), ...updateObjectDto };
    const queryObject = setUpdateQuery<UpdateObjectDto>('object', values, '"objectId"', id);

    const { rows } = await this.pool.query(queryObject);

    return rows[0];
  }

  async putUpdate(id: string, createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    const query = `
      UPDATE object
      SET name = $2, description = $3, "updatedAt" = $4
      WHERE "objectId" = $1
      RETURNING "objectId", name, description`;

    const values = [id, ...Object.values(createObjectDto), new Date()];
    const { rowCount, rows } = await this.pool.query(query, values);

    //  The PUT method requests that the state of the target resource be
    //  created or replaced with the state defined by the representation
    //  enclosed in the request message payload.
    //  https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.4

    if (rowCount === 0) {
      const query = `
      INSERT INTO object(
      "objectId", name, description, "createdAt", "updatedAt") 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING*`;

      const timestamp = new Date();
      const values = [id, ...Object.values(createObjectDto), timestamp, timestamp];

      const { rows } = await this.pool.query(query, values);

      return rows[0];
    }

    return rows[0];
  }

  async remove(id: string) {
    const query = `
      DELETE FROM object
      WHERE "objectId" = $1
      RETURNING*`;

    const { rows } = await this.pool.query(query, [id]);
    return rows[0];
  }
}

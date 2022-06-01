import { Pool } from 'pg';
import { PGConfigInterface } from '@app/common/interfaces';

let dbPool = null;

export function createPool(config: PGConfigInterface): Pool{
  dbPool = new Pool({
    user: config.DATABASE_USERNAME,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
  })
  return dbPool;
}

export function getPool(): Pool | null{
  return dbPool;
}
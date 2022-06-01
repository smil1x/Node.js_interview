export const APP_DESCRIPTION = {
  info: `Greenfield application with basic CRUD operations 
  working with one atomic entity object, implemented 
  with NestJS framework, connection to remote PostgreSQL DB 
  via AWS RDS. Uses TypeORM for db communication.`,
  stack: ['NestJS', 'TypeORM', 'PostgreSQL DB (AWS RDS)'],
};

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_LIMIT_NUMBER = 10;
export const MAX_LIMIT_NUMBER = 100;

export const OBJECT_BASE_ENTITY = ['id', 'name', 'description', 'createdAt', 'updatedAt'];

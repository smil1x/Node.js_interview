export const APP_DESCRIPTION = {
  info: `The application based on "obj-factory-v1-typeorm" 
  that demonstrates AWS Cognito authorization using passport-jwt.
  The app allows you to validate access token and id token.`,
  stack: ['NestJS', 'TypeORM', 'PostgreSQL DB (AWS RDS)', 'AWS Cognito auth'],
};

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_LIMIT_NUMBER = 10;
export const MAX_LIMIT_NUMBER = 100;

export const OBJECT_BASE_ENTITY = ['id', 'name', 'description', 'createdAt', 'updatedAt'];

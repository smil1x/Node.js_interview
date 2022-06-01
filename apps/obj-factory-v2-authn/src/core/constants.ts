export const APP_DESCRIPTION = {
  info: `The application based on "obj-factory-v1-typeorm" that demonstrates Azure AD authorization code flow using passport-azure-ad. 
  The app allows you to validate access tokens v1 and v2.`,
  stack: ['NestJS', 'TypeORM', 'PostgreSQL DB (AWS RDS)', 'Passport-JWT auth', 'Azure AD auth'],
};

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_LIMIT_NUMBER = 10;
export const MAX_LIMIT_NUMBER = 100;

export const OBJECT_BASE_ENTITY = ['id', 'name', 'description', 'createdAt', 'updatedAt'];

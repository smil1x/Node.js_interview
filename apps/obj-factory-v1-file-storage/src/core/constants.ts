export const APP_DESCRIPTION = {
  info: `Application that allows you to create objects with attached file xlsx | xls | csv | tsv | txt format, that uploads to storage (content of a file is saved
to a database), implemented with NestJS framework, connection to remote PostgreSQL DB via AWS RDS and connection to AWS Simple Storage Service (S3) for storing your files.
 Uses TypeORM for db communication`,
  stack: ['NestJS', 'TypeORM', 'PostgreSQL DB (AWS RDS)', 'AWS S3'],
};

// Custom provider token
export const XLSX_PACKAGE_TOKEN = 'xlsx';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_LIMIT_NUMBER = 10;
export const MAX_LIMIT_NUMBER = 100;

export const DEFAULT_LIMIT_NUMBER_GET_OBJECT_CONTENT = 5;
export const MAX_LIMIT_NUMBER_GET_OBJECT_CONTENT = 10;

export const DATA_CLASSIFICATION_NAMESPACE = '9291c478-d475-48e5-854b-5418d49a275e';
export const USER_NAMESPACE = 'bddb690e-5948-4994-8459-dd93feffe481';

export enum ALLOWED_FILE_TYPES {
  xlsx = 'xlsx',
  xls = 'xls',
  csv = 'csv',
  tsv = 'tsv',
  txt = 'txt',
}

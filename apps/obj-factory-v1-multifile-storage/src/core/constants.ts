export const APP_DESCRIPTION = {
  info: `Application that allows you to upload files with any format 
to storage and save files metadata to a database, implemented 
with NestJS framework, connection to remote PostgreSQL DB via AWS RDS 
and connection to AWS Simple Cloud Storage (S3) for storing your files. 
 Uses TypeORM for db communication.`,
  stack: ['NestJS', 'TypeORM', 'PostgreSQL DB (AWS RDS)', 'AWS S3'],
};

// Custom provider token
export const FILE_SIZE = 'FILE_SIZE';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_LIMIT_NUMBER = 10;
export const MAX_LIMIT_NUMBER = 100;

export const DEFAULT_LIMIT_NUMBER_GET_OBJECT_FILES = 5;
export const MAX_LIMIT_NUMBER_GET_OBJECT_FILES = 10;

export const DATA_CLASSIFICATION_NAMESPACE = '9291c478-d475-48e5-854b-5418d49a275e';
export const DATA_CLASS = 'multiFile';

export const USER_NAMESPACE = 'bddb690e-5948-4994-8459-dd93feffe481';
export const OBJECT_UUID_VERSION = '4';

export enum FileS3Operations {
  presignedUrl = 'presignedUrl',
  uploadToS3Bucket = 'uploadToS3Bucket',
}

export const JWT_STRATEGY = 'jwt';
export const USER_ID_FIELD = 'sub';

export const matchExtensionRegExp = /[^\\]*\.(\w+)$/;
export const NO_EXTENSION_ERROR_MESSAGE = 'Filename should contain extension';

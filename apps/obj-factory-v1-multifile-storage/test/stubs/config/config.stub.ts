export const config = {
  AWS_REGION: '',
  AWS_OPTIONS: {
    AWS_BUCKET_NAME: 'testBucketName',
  },
  PG_CONFIG: {
    DATABASE_HOST: 'test',
    DATABASE_PORT: 5432,
    DATABASE_USERNAME: 'test',
    DATABASE_PASSWORD: 'test',
    DATABASE_NAME: 'test',
    DATABASE_SYNCHRONIZE: false,
  },
  MAX_TOTAL_FILES_SIZE: 10485760,
  AWS_S3_SIGNATURE_VERSION: 'v4',
  SIGNED_URL_EXPIRES_AT: 300,
  JWT_SECRET: 'test',
  APP_PORT: 3000,
};

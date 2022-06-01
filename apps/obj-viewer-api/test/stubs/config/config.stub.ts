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
  MAX_FILE_SIZE: 1024,
  APP_PROTOCOL: 'http',
  APP_HOSTNAME: 'localhost:3000',
  AUTH_OPTIONS: {
    jwt_strategy: {
      secretKey: '',
    },
  },
};

export interface BaseConfigInterface {
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  PG_CONFIG: {
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_SYNCHRONIZE: boolean;
  };
}

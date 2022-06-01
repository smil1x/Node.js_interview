import { PGConfigInterface } from '@app/common/interfaces';

export interface BaseConfigInterface {
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  PG_CONFIG: PGConfigInterface;
  JWT_SECRET: string;
  APP_PORT?: number;
}

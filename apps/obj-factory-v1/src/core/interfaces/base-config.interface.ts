import { PGConfigInterface } from '@app/common/interfaces';

export interface BaseConfigInterface {
  AWS_REGION?: string;
  PG_CONFIG: PGConfigInterface;
  APP_PORT?: number;
}

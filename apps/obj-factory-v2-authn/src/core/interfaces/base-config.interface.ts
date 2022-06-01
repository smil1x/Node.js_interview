import { PGConfigInterface } from '@app/common/interfaces';
import { AuthOptions } from '@app/auth';

export interface BaseConfigInterface {
  AWS_REGION?: string;
  PG_CONFIG: PGConfigInterface;
  APP_PORT?: number;
  APP_PROTOCOL: string;
  APP_HOSTNAME: string;
  AUTH_OPTIONS: AuthOptions;
}

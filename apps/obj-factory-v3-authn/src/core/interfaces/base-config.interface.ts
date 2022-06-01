import { PGConfigInterface } from '@app/common/interfaces';
import { ICognitoConfig } from '@app/auth/interfaces';

export interface BaseConfigInterface {
  AWS_REGION?: string;
  PG_CONFIG: PGConfigInterface;
  APP_PROTOCOL: string;
  APP_HOSTNAME: string;
  APP_PORT?: number;
  COGNITO_CONFIG: ICognitoConfig;
}

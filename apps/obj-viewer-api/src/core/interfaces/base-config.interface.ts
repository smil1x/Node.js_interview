import { PGConfigInterface } from '@app/common/interfaces';
import { AuthOptions } from '@app/auth';
import { AwsConfigInterface } from '@app/aws/interfaces';

export interface BaseConfigInterface {
  AWS_REGION: string;
  AWS_OPTIONS: AwsConfigInterface;
  PG_CONFIG: PGConfigInterface;
  MAX_FILE_SIZE?: number;
  APP_PORT?: number;
  APP_PROTOCOL: string;
  APP_HOSTNAME: string;
  AUTH_OPTIONS: AuthOptions;
}

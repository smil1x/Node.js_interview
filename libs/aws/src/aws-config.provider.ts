import { ValueProvider } from '@nestjs/common';
import { AWS_CONFIG } from './constants';
import { AwsConfigInterface } from './interfaces';

export const awsConfigProvider = (awsConfig: AwsConfigInterface): ValueProvider => ({
  provide: AWS_CONFIG,
  useValue: awsConfig,
});

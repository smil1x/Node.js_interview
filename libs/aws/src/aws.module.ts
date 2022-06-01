import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { AwsConfigInterface } from '@app/aws/interfaces/aws-config.interface';
import { awsConfigProvider } from '@app/aws/aws-config.provider';

@Global()
@Module({})
export class AwsModule {
  static register(awsConfig: AwsConfigInterface): DynamicModule {
    return {
      module: AwsModule,
      providers: [S3Service, awsConfigProvider(awsConfig)],
      exports: [S3Service],
    };
  }
}

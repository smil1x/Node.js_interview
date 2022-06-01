import { Inject, Injectable, InternalServerErrorException, Optional } from '@nestjs/common';
import { AWS_CONFIG } from './constants';
import { S3 } from 'aws-sdk';
import { fileNotFoundMsg } from '@app/common';
import { AwsConfigInterface } from '@app/aws/interfaces';

@Injectable()
export class S3Service {
  [key: string]: any;
  private readonly s3instance;

  constructor(@Optional() @Inject(AWS_CONFIG) protected readonly awsConfig?: AwsConfigInterface) {
    this.s3instance = awsConfig?.AWS_S3_SIGNATURE_VERSION
      ? new S3({ signatureVersion: this.awsConfig.AWS_S3_SIGNATURE_VERSION })
      : new S3();

    return new Proxy(this, {
      get: (target, propKey: string) => {
        const classMethods = Object.getOwnPropertyNames(target.constructor.prototype).filter(
          (name) => name !== 'constructor',
        );

        if (classMethods.includes(propKey)) {
          return (...args) => target[propKey](...args);
        } else {
          if (
            propKey !== 'constructor' &&
            (propKey in target.s3instance.api.operations || Object.getOwnPropertyNames(S3.prototype).includes(propKey))
          ) {
            return (...args) => {
              const result = target.s3instance[propKey](...args);
              return result.promise?.name === 'promise' ? result.promise() : result;
            };
          } else {
            return target.s3instance[propKey];
          }
        }
      },
    });
  }

  getS3Client() {
    return this.s3instance;
  }

  async getPresignedUrlIfExists(operation: string, params: Record<string, any>) {
    const fileExists = await this.fileExistsInBucket(params);

    return fileExists
      ? await this.s3instance.getSignedUrlPromise(operation, params)
      : fileNotFoundMsg('s3Key', params.Key);
  }

  async fileExistsInBucket(params: Record<string, any>) {
    const { Key, Bucket } = params;
    return this.s3instance
      .headObject({ Bucket, Key })
      .promise()
      .then(() => true)
      .catch((error) => {
        if (error.code === 'NotFound') {
          return false;
        }
        throw new InternalServerErrorException('Failed to retrieve file metadata');
      });
  }
}

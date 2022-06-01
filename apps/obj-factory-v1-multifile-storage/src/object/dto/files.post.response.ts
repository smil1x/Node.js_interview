import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesToBucketResponse {
  @ApiProperty({
    description: 'Object id',
    example: '0e18c9de-9bf6-4cb1-aaf9-46a89b73958c',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Uploaded files metadata',
    type: [Object],
    example: [
      {
        fileExt: 'xlsx',
        fileName: 'test_data.xlsx',
      },
    ],
  })
  readonly filesMetadata: Record<string, any>[];
}

export class GetPresignedUrlsResponse {
  @ApiProperty({
    description: 'Object id',
    example: '0e18c9de-9bf6-4cb1-aaf9-46a89b73958c',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Files metadata and Presigned Url for uploading',
    type: [Object],
    example: [
      {
        fileExt: 'xlsx',
        fileName: 'test_data.xlsx',
        presignedUrl:
          'https://presignedurldemo.s3.eu-west-2.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<>&X-Amz-Date=<>X-Amz-Expires=1800&X-Amz-Signature=<>&X-Amz-SignedHeaders=<>',
      },
    ],
  })
  readonly filesMetadataAndPresignedUrl: Record<string, any>[];
}

import { ApiProperty } from '@nestjs/swagger';

export class GetFileResponse {
  @ApiProperty({
    description: 'Object id',
    example: '0e18c9de-9bf6-4cb1-aaf9-46a89b73958c',
  })
  readonly id: string;

  @ApiProperty({
    description: 'File metadata',
    example: { fileExt: 'xlsx', fileName: 'test_data.xlsx' },
  })
  fileMetadata: Record<string, any>;

  @ApiProperty({
    description: 'Presigned URL to get File from AWS S3 bucket',
    example:
      'https://presignedurldemo.s3.eu-west-2.amazonaws.com/test_data.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<>&X-Amz-Date=<>X-Amz-Expires=1800&X-Amz-Signature=<>&X-Amz-SignedHeaders=<>',
  })
  readonly presignedUrl: string;
}

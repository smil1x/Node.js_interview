import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileResponse {
  @ApiProperty({
    description: 'Object id',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Deleted file metadata',
    example: { fileExt: 'xlsx', fileName: 'test_data.xlsx' },
  })
  readonly deletedFileMetadata: Record<string, any>;
}

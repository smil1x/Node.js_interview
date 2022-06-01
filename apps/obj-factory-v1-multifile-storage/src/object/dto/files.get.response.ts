import { ApiProperty } from '@nestjs/swagger';

export class GetAllFilesResponse {
  @ApiProperty({
    description: 'Object id',
    example: '0e18c9de-9bf6-4cb1-aaf9-46a89b73958c',
  })
  readonly id: string;

  @ApiProperty({
    description: 'How many rows were skipped - offset',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Number of requested rows - limit',
    example: 5,
  })
  readonly pageSize: number;

  @ApiProperty({
    description: 'Total number of uploaded files',
    example: 10,
  })
  readonly totalUploadedFiles: number;

  @ApiProperty({
    description: 'List of received files',
    type: [Object],
  })
  readonly retrievedFiles: Record<string, any>[];
}

import { ApiProperty } from '@nestjs/swagger';

export class DeleteObjectContentRowResponse {
  @ApiProperty({
    description: 'Object id',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Total number of rows in "content" field',
  })
  readonly totalContentRows: number;

  @ApiProperty({
    description: 'Deleted content row',
  })
  readonly deletedRow: Record<string, any>;

  @ApiProperty({
    description: 'Successful deletion message',
  })
  readonly message: string;
}

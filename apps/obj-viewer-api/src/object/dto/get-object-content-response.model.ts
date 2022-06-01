import { ApiProperty } from '@nestjs/swagger';

export class GetObjectContentResponse {
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
    description: 'Object id',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Total number of rows in "content" field',
    example: 10,
  })
  readonly totalContentRows: number;

  @ApiProperty({
    description: 'List of received rows from "content" field ',
    type: [Object],
  })
  readonly contentRows: Record<string, any>[];
}

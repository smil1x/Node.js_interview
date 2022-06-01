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
    description: 'Total number of items in "content" field',
    example: 10,
  })
  readonly total_content_items: number;

  @ApiProperty({
    description: 'List of received items from "content" field ',
    type: [Object],
  })
  readonly content_items: Record<string, any>[];
}

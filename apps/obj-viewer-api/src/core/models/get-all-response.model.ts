import { ObjectEntity } from '@app/common/db/entities';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllResponse<ObjectEntity> {
  @ApiProperty({
    description: 'Total number of rows in database table',
    example: 20,
  })
  readonly total: number;

  @ApiProperty({
    description: 'How many rows were skipped - offset',
    example: 2,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Number of requested rows - limit',
    example: 10,
  })
  readonly pageSize: number;

  @ApiProperty({
    description: 'List of received objects',
    type: [ObjectEntity],
  })
  readonly data: ObjectEntity[];
}

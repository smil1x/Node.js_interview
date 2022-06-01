import { ApiProperty } from '@nestjs/swagger';
import { BaseObjectResponse } from '../../object/dto';

export class GetAllResponse<BaseObjectResponse> {
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
    type: [BaseObjectResponse],
  })
  readonly data: BaseObjectResponse[];
}

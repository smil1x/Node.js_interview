import { BaseObjectResponse } from './base-object.response';
import { ApiProperty } from '@nestjs/swagger';

export class GetObjectsResponse {
  @ApiProperty({ type: [BaseObjectResponse] })
  data: Array<BaseObjectResponse>;
  @ApiProperty()
  totalObjects: number;
}

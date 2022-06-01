import { ApiProperty } from '@nestjs/swagger';
import { IObjectMetadata } from '..//object.interface';

export class CreateObjectResponse {
  @ApiProperty({
    description: 'Object Id',
  })
  readonly id: string;

  @ApiProperty({ description: 'Object name' })
  readonly name: string;

  @ApiProperty({
    description: 'Object description',
  })
  readonly description: string;

  @ApiProperty({
    description: 'Object metadata',
  })
  readonly metadata: IObjectMetadata;

  @ApiProperty({
    description: 'Object creation time',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Object update time',
  })
  readonly updatedAt: Date;
}

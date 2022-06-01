import { ApiProperty } from '@nestjs/swagger';

export class ObjectEntity {
  @ApiProperty({ description: 'object uuid v4' })
  readonly objectId: string;
  @ApiProperty({ description: 'name of the object' })
  readonly name: string;
  @ApiProperty({ description: 'description of the object' })
  readonly description: string;
  @ApiProperty({ description: 'Date of creation' })
  readonly createdAt?: string;
  @ApiProperty({ description: 'Date of update' })
  readonly updatedAt?: string;
  @ApiProperty({ description: 'Person who updated entity' })
  readonly updatedBy?: string | null;
  @ApiProperty({ description: 'Person who created entity' })
  readonly createdBy?: string | null;
  @ApiProperty({ description: 'Version number' })
  readonly versionNumber?: number;
  @ApiProperty({ description: 'Tags' })
  readonly tags?: string[] | null;
  @ApiProperty({ description: 'Metadata' })
  readonly metadata?: any;
  @ApiProperty({ description: 'Content' })
  readonly content?: any;
}

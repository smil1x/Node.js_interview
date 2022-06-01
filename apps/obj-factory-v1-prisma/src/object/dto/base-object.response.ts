import { ApiProperty } from '@nestjs/swagger';

export class BaseObjectResponse {
  @ApiProperty()
  objectId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  tags: Array<string>;
  @ApiProperty()
  metadata: Record<string, any>;
  @ApiProperty()
  versionNumber: number;
  @ApiProperty()
  createdBy: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedBy: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  content: Record<string, any>[] | null;
}

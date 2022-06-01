import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FieldsKeyValue {
  @ApiProperty({ description: 'content row field name', example: 'sites', type: String })
  @IsString()
  readonly key: string;

  @ApiProperty({ description: 'content row field new value', example: 'Saint-P', type: String })
  @IsString()
  readonly value: string;
}

export class UpdateContentDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    type: [FieldsKeyValue],
  })
  readonly fields: FieldsKeyValue[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'contentId of content row', example: 1 })
  contentId: number;
}

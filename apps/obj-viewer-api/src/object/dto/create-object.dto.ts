import { IsNotEmpty, IsString, IsUUID, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ALLOWED_FILE_TYPES } from '../../core/constants';

export class CreateObjectDto {
  @ApiPropertyOptional({
    description: 'Object Id. Provide "id" to update existing object',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.id !== '')
  @IsString()
  @IsUUID('4')
  readonly id?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Object name', example: 'Data slice' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Object description',
    example: 'Excel document',
  })
  readonly description: string;

  @ApiProperty({
    description: `Attached file. Allowed formats: ${Object.values(ALLOWED_FILE_TYPES).join(', ')}`,
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  readonly file: any;
}

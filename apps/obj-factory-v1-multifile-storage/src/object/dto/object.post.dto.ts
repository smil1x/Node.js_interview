import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ObjectPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Object name', example: 'Research' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Object description',
    example: 'Set of documents',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    description: 'Object metadata',
    example: { language: 'EN', studyType: 'observational', studyStatus: 'completed' },
  })
  readonly metadata: Record<string, any>;
}

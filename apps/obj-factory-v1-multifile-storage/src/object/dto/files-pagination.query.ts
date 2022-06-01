import { IsBoolean, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DEFAULT_LIMIT_NUMBER_GET_OBJECT_FILES, MAX_LIMIT_NUMBER_GET_OBJECT_FILES } from '../../core/constants';
import { ObjectPaginationQuery } from './object-pagination.query';

export class FilesPaginationQuery extends ObjectPaginationQuery {
  @ApiProperty({
    maximum: MAX_LIMIT_NUMBER_GET_OBJECT_FILES,
    default: DEFAULT_LIMIT_NUMBER_GET_OBJECT_FILES,
  })
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_LIMIT_NUMBER_GET_OBJECT_FILES)
  readonly pageSize: number = DEFAULT_LIMIT_NUMBER_GET_OBJECT_FILES;

  @ApiPropertyOptional({
    description: 'Generate presigned url for files',
    default: 'false',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'true'].indexOf(value) > -1;
  })
  readonly presignedUrl?: boolean;
}

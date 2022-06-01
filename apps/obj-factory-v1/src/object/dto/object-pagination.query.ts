import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Max } from 'class-validator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_LIMIT_NUMBER, MAX_LIMIT_NUMBER } from '../../core/constants';

export class ObjectPaginationQuery {
  @ApiPropertyOptional({
    description: 'how many rows to skip',
    default: DEFAULT_PAGE_NUMBER,
  })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'number of requested rows',
    default: DEFAULT_LIMIT_NUMBER,
    minimum: 1,
  })
  @IsPositive()
  @Max(MAX_LIMIT_NUMBER)
  @Type(() => Number)
  pageSize: number;
}

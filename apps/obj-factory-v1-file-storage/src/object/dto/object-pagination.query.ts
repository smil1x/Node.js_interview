import { IsNumber, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_PAGE_NUMBER, DEFAULT_LIMIT_NUMBER, MAX_LIMIT_NUMBER } from '../../core/constants';

export class ObjectPaginationQuery {
  @ApiProperty({
    description: 'how many rows to skip',
    default: DEFAULT_PAGE_NUMBER,
  })
  @Type(() => Number)
  @IsNumber()
  page: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    description: 'number of requested rows',
    maximum: MAX_LIMIT_NUMBER,
    default: DEFAULT_LIMIT_NUMBER,
  })
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_LIMIT_NUMBER)
  pageSize: number = DEFAULT_LIMIT_NUMBER;
}

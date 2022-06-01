import { IsNumber, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_LIMIT_NUMBER_GET_OBJECT_CONTENT, MAX_LIMIT_NUMBER_GET_OBJECT_CONTENT } from '../../core/constants';
import { ObjectPaginationQuery } from './object-pagination.query';

export class ObjectContentPaginationQuery extends ObjectPaginationQuery {
  @ApiProperty({
    maximum: MAX_LIMIT_NUMBER_GET_OBJECT_CONTENT,
    default: DEFAULT_LIMIT_NUMBER_GET_OBJECT_CONTENT,
  })
  @Type(() => Number)
  @IsNumber()
  @Max(MAX_LIMIT_NUMBER_GET_OBJECT_CONTENT)
  pageSize: number = DEFAULT_LIMIT_NUMBER_GET_OBJECT_CONTENT;
}

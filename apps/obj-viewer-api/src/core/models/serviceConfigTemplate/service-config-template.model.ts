import { ApiExtraModels, ApiProperty, ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import { IsBooleanString, IsIn, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { httpMethods } from '../../constants';
import { Method } from 'axios';
import { BasicCredentials } from '../basic-credentials.model';
import { ProxyConfig } from './axios-proxy-config.model';
import { MapField } from './map-field.model';
import { Type } from 'class-transformer';

@ApiExtraModels(MapField)
export class ServiceConfigTemplate {
  @ApiPropertyOptional({ type: String })
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    enum: [...httpMethods, ...httpMethods.map((method) => method.toLowerCase())],
  })
  @IsOptional()
  @IsIn([...httpMethods, ...httpMethods.map((method) => method.toLowerCase())])
  method?: Method;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  baseURL: string;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @ApiPropertyOptional({
    type: Object,
    additionalProperties: {
      anyOf: [
        { $ref: getSchemaPath(MapField) },
        { type: 'number' },
        { type: 'boolean' },
        { type: 'string' },
        { type: 'object' },
      ],
    },
  })
  @IsOptional()
  @IsObject()
  params?: Record<string, MapField | string | number | Record<string, string>>;

  @ApiPropertyOptional({
    type: Object,
    additionalProperties: {
      anyOf: [
        { $ref: getSchemaPath(MapField) },
        { type: 'number' },
        { type: 'boolean' },
        { type: 'string' },
        { type: 'object' },
      ],
    },
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, MapField | string | number | Record<string, string>>;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  timeout?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBooleanString()
  withCredentials?: boolean;

  @ApiPropertyOptional({ type: BasicCredentials })
  @IsOptional()
  @ValidateNested()
  @Type(() => BasicCredentials)
  auth?: BasicCredentials;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  xsrfCookieName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  xsrfHeaderName?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  maxContentLength?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  maxBodyLength?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  maxRedirects?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  socketPath?: string | null;

  @ApiPropertyOptional({ type: ProxyConfig })
  @IsOptional()
  proxy?: ProxyConfig | false;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBooleanString()
  decompress?: boolean;
}

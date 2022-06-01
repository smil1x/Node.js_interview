import { ApiProperty } from '@nestjs/swagger';
import { BasicCredentials } from '../basic-credentials.model';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProxyConfig {
  @ApiProperty({ type: String })
  @IsString()
  host: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  port: number;

  @ApiProperty({ type: BasicCredentials })
  @ValidateNested()
  @Type(() => BasicCredentials)
  auth?: BasicCredentials;

  @ApiProperty({ type: String })
  @IsString()
  protocol?: string;
}

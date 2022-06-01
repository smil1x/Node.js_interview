import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MapField {
  @ApiProperty({ enum: ['mapping'] })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  value: any;
}

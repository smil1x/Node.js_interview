import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  description: string;
}

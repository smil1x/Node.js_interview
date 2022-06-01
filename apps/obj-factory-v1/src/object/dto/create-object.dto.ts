import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateObjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'name of the object', example: 'Cells' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description of the object',
    example: 'Intracellular communication in eukaryotes',
  })
  readonly description: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ObjectPostDto {
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

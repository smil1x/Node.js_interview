import { IsNotEmpty, IsArray, ArrayMinSize, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { matchExtensionRegExp, NO_EXTENSION_ERROR_MESSAGE } from '../../core/constants';

export class FilesPostJsonDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @Matches(matchExtensionRegExp, { each: true, message: NO_EXTENSION_ERROR_MESSAGE })
  @ArrayMinSize(1)
  @ApiProperty({ type: 'array', items: { type: 'string' }, example: ['test_data.xlsx'] })
  fileNames: string[];
}

export class FilesPostFormDataDto {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'The list of files',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}

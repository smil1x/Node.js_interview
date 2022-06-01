import { IsNotEmpty, IsString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceConfigTemplate } from '../../core/models/serviceConfigTemplate';
import { Type } from 'class-transformer';
import { IsMappable } from '../../core/decorators';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  @ApiProperty({ example: 'f7c48c27-10cd-4814-a7c5-330d68a20c97', type: String })
  objectId: string;

  @IsArray({
    message: 'Parameters should be defined either by an empty array or by an array with the name of parameters',
  })
  @ApiProperty({ example: ['sites', 'abbrevName'], type: [String] })
  parameters: string[];

  @ApiProperty({
    description: 'AxiosRequestConfig',
    example: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      method: 'POST',
      params: {
        site: { value: 'sites', type: 'mapping' },
        commonParam: 123,
      },
      data: {
        webSite: { value: 'sites', type: 'mapping' },
        commonData: 134,
        abbrevName: { value: 'abbrevName', type: 'mapping' },
      },
    },
    type: ServiceConfigTemplate,
  })
  @IsNotEmpty()
  @ValidateNested({ context: { parent: this } })
  @Type(() => ServiceConfigTemplate)
  @IsMappable('parameters', { message: 'Failed to map serviceConfigTemplate' })
  serviceConfigTemplate: ServiceConfigTemplate;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'externalAPI', type: String })
  serviceName: string;
}

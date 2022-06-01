import { ApiProperty } from '@nestjs/swagger';

export class SuccessTaskModel {
  @ApiProperty({ description: 'type - response type of the external service' })
  externalResponse: any;

  @ApiProperty()
  contentId: number;
}

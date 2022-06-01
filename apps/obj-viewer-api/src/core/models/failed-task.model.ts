import { ApiProperty } from '@nestjs/swagger';

export class FailedTaskModel {
  @ApiProperty()
  contentId: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isExternalServiceError: boolean;
}

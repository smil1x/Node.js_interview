import { ApiProperty } from '@nestjs/swagger';

export class ResponseError {
  @ApiProperty({
    description: 'Message with description of error',
  })
  readonly response: {
    readonly message: string;
    readonly error: string;
  };

  @ApiProperty({
    description: 'Time when Error was found',
    example: '2021-09-02T13:04:02.882Z',
  })
  readonly timestamp: string;

  @ApiProperty({
    description: 'Path where Error was found',
    example: 'http://localhost:3000/api/v1/objects',
  })
  readonly path: string;
}

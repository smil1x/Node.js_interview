import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  OK = 'ok',
  DOWN = 'down',
}

class TimeIndicator {
  rawTime: number;
  parsedTime: string;
}

export class GitInfo {
  @ApiProperty({ type: String })
  branch: string;
  @ApiProperty({ type: String })
  commit: string;
  @ApiProperty({ type: String })
  authorName: string;
  @ApiProperty({ type: String })
  commitTime: string;
  @ApiProperty({ type: String })
  commitMsg: string;
}

export class HealthIndicator {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ enum: Status })
  status: Status;
  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'object',
        properties: {
          rawTime: {
            type: 'number',
          },
          parsedTime: {
            type: 'string',
          },
        },
      },
    ],
  })
  info: string | TimeIndicator;
}

export default HealthIndicator;

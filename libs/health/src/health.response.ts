import { GitInfo, HealthIndicator } from '@app/health/health-indicator.class';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(GitInfo)
export class HealthResponse {
  @ApiProperty({ type: String })
  appDescription: string;
  @ApiProperty({ type: [HealthIndicator] })
  indicators: HealthIndicator[];
  @ApiProperty({
    type: Object,
    additionalProperties: {
      oneOf: [{ type: 'string' }, { $ref: getSchemaPath(GitInfo) }],
    },
  })
  git: GitInfo | string
}

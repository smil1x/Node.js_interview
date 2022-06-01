import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from '@app/health/health.response';

@ApiTags('Health')
@Controller('/health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @ApiResponse({ type: HealthResponse })
  @Get()
  healthCheck() {
    return this.healthService.healthCheck();
  }
}

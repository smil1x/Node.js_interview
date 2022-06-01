import { Inject, Injectable } from '@nestjs/common';
import { uptime as processUptime } from 'process';
import { GitInfo, HealthIndicator, Status } from './health-indicator.class';
import * as path from 'path';
import { freemem, totalmem, uptime as osUptime } from 'os';
import { readFileSync } from 'fs';
import { APP_DESCRIPTION, TEST_DB_CONNECTION_CALLBACK } from '@app/health/consts';
import { HealthResponse } from '@app/health/health.response';
import { bytesToMegabytes, secondsToHms } from '@app/health/utils';

@Injectable()
export class HealthService {
  constructor(
    @Inject(APP_DESCRIPTION) protected readonly appDescription: string,
    @Inject(TEST_DB_CONNECTION_CALLBACK) protected readonly dbConnectionCallback: any,
  ) {}

  async healthCheck(): Promise<HealthResponse> {
    return {
      appDescription: this.appDescription,
      indicators: [
        this.getRAMIndicator(),
        this.getOsUptimeIndicator(),
        this.getTimezoneIndicator(),
        await this.getDBIndicator(),
        this.getProcessUptimeIndicator(),
      ],
      git: this.getGitInfo(),
    };
  }

  getRAMIndicator(): HealthIndicator {
    const freeMem = bytesToMegabytes(freemem());
    const totalMem = bytesToMegabytes(totalmem());
    const info = freeMem + '/' + totalMem + ' MB';
    return this.getTelemetry('RAM', Status.OK, info);
  }

  getOsUptimeIndicator(): HealthIndicator {
    const rawTime = osUptime();
    const parsedTime = secondsToHms(rawTime);
    return this.getTelemetry('OS uptime', Status.OK, { rawTime, parsedTime });
  }

  getTimezoneIndicator(): HealthIndicator {
    const info = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.getTelemetry('Timezone', Status.OK, info);
  }

  async getDBIndicator(): Promise<HealthIndicator> {
    try {
      await this.dbConnectionCallback();
      return this.getTelemetry('Database', Status.OK, 'connection established');
    } catch (e) {
      return this.getTelemetry('Database', Status.DOWN, e.message);
    }
  }

  getProcessUptimeIndicator(): HealthIndicator {
    const rawTime = processUptime();
    const parsedTime = secondsToHms(rawTime);
    return this.getTelemetry('App uptime', Status.OK, { rawTime, parsedTime });
  }

  getGitInfo(): GitInfo | string {
    try {
      const gitInfoJson = readFileSync(path.resolve(__dirname, 'commit-info.json'), 'utf-8');
      return JSON.parse(gitInfoJson);
    } catch (e) {
      console.log(e.message);
      return 'failed to get information about git';
    }
  }

  private getTelemetry(
    name: HealthIndicator['name'],
    status: HealthIndicator['status'],
    info: HealthIndicator['info'],
  ): HealthIndicator {
    return { name, status, info };
  }
}

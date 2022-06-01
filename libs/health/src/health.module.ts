import { DynamicModule, Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { APP_DESCRIPTION, TEST_DB_CONNECTION_CALLBACK } from '@app/health/consts';

@Module({})
export class HealthModule {
  static register(appDescription: Record<string, any>, testDbConnection: () => Promise<any>): DynamicModule {
    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: APP_DESCRIPTION,
          useValue: appDescription,
        },
        {
          provide: TEST_DB_CONNECTION_CALLBACK,
          useValue: testDbConnection,
        },
      ],
    };
  }
}

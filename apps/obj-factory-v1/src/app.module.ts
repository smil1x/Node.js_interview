import { DynamicModule, Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ObjectModule } from './object/object.module';
import { AppRegisterOptions } from './core/interfaces';
import { HealthModule } from '@app/health';
import { APP_DESCRIPTION } from './core/constants';
import { getPool } from './db/db.provider';

@Module({})
export class AppModule {
  public static register(options: AppRegisterOptions): DynamicModule {
    const { config } = options;
    return {
      module: AppModule,
      imports: [ObjectModule, DbModule.register(config.PG_CONFIG), HealthModule.register(APP_DESCRIPTION, () => getPool().query('select 1'))],
    };
  }
}

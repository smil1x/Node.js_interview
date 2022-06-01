import { DynamicModule, Global, Module } from '@nestjs/common';
import { PG_CONNECTION } from '../core/constants';
import { createPool } from './db.provider';
import { PGConfigInterface } from '@app/common/interfaces';

@Global()
@Module({})
export class DbModule {
  public static register(pgConfig: PGConfigInterface): DynamicModule {
    const dbProvider = {
      provide: PG_CONNECTION,
      useValue: createPool(pgConfig),
    };

    return {
      module: DbModule,
      providers: [dbProvider],
      exports: [dbProvider],
    };
  }
}

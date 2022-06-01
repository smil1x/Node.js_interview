import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { ObjectModule } from './object/object.module';
import { ObjectEntity } from './object/object.entity';
import { AppRegisterOptions } from './core/interfaces';
import { HealthModule } from '@app/health';
import { APP_DESCRIPTION } from './core/constants';
import { getConnection } from 'typeorm';
import { LoggerModule } from '@app/logger';
import { CommonOptionsInterface } from '@app/common/interfaces';
import { name, version } from '../package.json';

const commonOptions: CommonOptionsInterface = {
  appName: name,
  appVersion: version,
};

@Module({})
export class AppModule {
  public static register(options: AppRegisterOptions): DynamicModule {
    const { config } = options;

    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: config.PG_CONFIG.DATABASE_HOST,
          port: config.PG_CONFIG.DATABASE_PORT,
          username: config.PG_CONFIG.DATABASE_USERNAME,
          password: config.PG_CONFIG.DATABASE_PASSWORD,
          database: config.PG_CONFIG.DATABASE_NAME,
          entities: [ObjectEntity],
          synchronize: config.PG_CONFIG.DATABASE_SYNCHRONIZE,
        }),
        ObjectModule,
        LoggerModule.register({ ...commonOptions }),
        HealthModule.register(APP_DESCRIPTION, () => getConnection().query('select 1')),
      ],
    };
  }
}

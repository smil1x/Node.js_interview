import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { ObjectModule } from '../object/object.module';
import { ObjectEntity } from '../object/entities/object.entity';
import { AppRegisterOptions } from './interfaces';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../../../apps/obj-factory-ui-react-v1', 'client', 'build'),
        }),
        ObjectModule,
      ],
    };
  }
}

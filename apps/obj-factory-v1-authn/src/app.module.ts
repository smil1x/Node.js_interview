import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { ObjectModule } from './object/object.module';
import { ObjectEntity } from '@app/common/db/entities';
import { AppRegisterOptions } from './core/interfaces';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { HealthModule } from '@app/health';
import { APP_DESCRIPTION } from './core/constants';
import { getConnection } from 'typeorm';

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
          entities: [ObjectEntity, UserEntity],
          synchronize: config.PG_CONFIG.DATABASE_SYNCHRONIZE,
        }),
        ObjectModule,
        AuthModule.register({ secretKey: config.JWT_SECRET }),
        HealthModule.register(APP_DESCRIPTION, () => getConnection().query('select 1')),
      ],
    };
  }
}

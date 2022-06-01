import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectController } from './object.controller';
import { ObjectRepository } from './object.repository';
import { AppRegisterOptions } from '../core/interfaces';
import { ObjectService } from './object.service';
import { FILE_SIZE } from '../core/constants';
import { awsConfigProvider } from '@app/aws/aws-config.provider';

@Module({})
export class ObjectModule {
  public static register(options: AppRegisterOptions): DynamicModule {
    const { config } = options;

    return {
      module: ObjectModule,
      imports: [TypeOrmModule.forFeature([ObjectRepository])],
      controllers: [ObjectController],
      providers: [
        ObjectService,
        awsConfigProvider(config.AWS_OPTIONS),
        {
          provide: FILE_SIZE,
          useValue: config.MAX_TOTAL_FILES_SIZE,
        },
      ],
    };
  }
}

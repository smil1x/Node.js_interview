import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as xlsx from 'xlsx';
import { ObjectController } from './object.controller';
import { ObjectRepository } from './object.repository';
import { AppRegisterOptions } from '../core/interfaces';
import { ParserService, ObjectService } from './services';
import { XLSX_PACKAGE_TOKEN } from '../core/constants';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter } from '../core/utils';
import { awsConfigProvider } from '@app/aws/aws-config.provider';

@Module({})
export class ObjectModule {
  public static register(options: AppRegisterOptions): DynamicModule {
    const { config } = options;

    return {
      module: ObjectModule,
      imports: [
        TypeOrmModule.forFeature([ObjectRepository]),
        MulterModule.registerAsync({
          useFactory: async () => ({
            fileFilter,
            limits: { fileSize: config.MAX_FILE_SIZE },
          }),
        }),
      ],
      controllers: [ObjectController],
      providers: [
        ObjectService,
        awsConfigProvider(config.AWS_OPTIONS),
        ParserService,
        {
          provide: XLSX_PACKAGE_TOKEN,
          useValue: xlsx,
        },
      ],
    };
  }
}

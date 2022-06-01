import { DynamicModule, Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { LoggerConfigInterface } from '@app/logger/interfaces';
import { loggerConfigProvider } from './logger-config.provider';

@Global()
@Module({})
export class LoggerModule {
  public static register(loggerOptions: LoggerConfigInterface): DynamicModule {
    return {
      module: LoggerModule,
      providers: [CustomLoggerService, loggerConfigProvider(loggerOptions)],
      exports: [CustomLoggerService],
    };
  }
}

import { LOGGER_CONFIG, LogLevel, TransportType } from '@app/logger/consts';
import { LoggerConfigInterface } from '@app/logger/interfaces';
import { CommonOptionsInterface } from '@app/common/interfaces';

export const loggerConfigProvider = (loggerOptions: LoggerConfigInterface) => ({
  provide: LOGGER_CONFIG,
  useValue: loggerOptions,
});

export const prepareLoggerConfig = (config, commonOptions: CommonOptionsInterface): LoggerConfigInterface => ({
  appName: commonOptions.appName,
  appVersion: commonOptions.appVersion,
  transportType: config?.TRANSPORT_TYPE || TransportType.CONSOLE,
  logLevel: config?.LOG_LEVEL || LogLevel.info,
});

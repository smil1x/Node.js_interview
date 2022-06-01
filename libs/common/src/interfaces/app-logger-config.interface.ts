import { LogLevel, TransportType } from '@app/logger/consts';

export interface AppLoggerConfigInterface {
  TRANSPORT_TYPE?: typeof TransportType[keyof typeof TransportType];
  LOG_LEVEL?: typeof LogLevel[keyof typeof LogLevel];
}

import { LogLevel, TransportType } from '../consts';

export interface LoggerConfigInterface {
  appName: string;
  appVersion?: string;
  transportType?: typeof TransportType[keyof typeof TransportType];
  logLevel?: typeof LogLevel[keyof typeof LogLevel];
}

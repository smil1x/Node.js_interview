import * as winston from 'winston';
import path from 'path';
import {
  DEFAULT_LOG_FILENAME_EXT,
  DEFAULT_LOG_FOLDER_NAME,
  DEFAULT_LOG_OPTIONS,
  DEFAULT_TIME_FORMAT,
  JSON_FORMAT_SPACES,
  LogLevel,
  TransportType,
} from './consts';
import { transformWinstonFormat } from '@app/logger/utils';
import { format } from 'winston';
import { upperFirst } from 'lodash';
const { combine, timestamp, json, colorize, printf } = format;

export class TransportFactory {
  static getConsoleTransport(appName: string, appVersion?: string, level = LogLevel.info): winston.transport {
    const consoleFormat = {
      format: combine(
        {
          ...transformWinstonFormat,
        },
        timestamp({ format: DEFAULT_TIME_FORMAT }),
        printf(({ level, message, timestamp }) => {
          if (typeof message === 'object') {
            message = JSON.stringify(message, null, JSON_FORMAT_SPACES);
          }

          const appData = `${upperFirst(appName)}${appVersion ? ` ${appVersion}` : ''}`;
          return `[${appData}] - ${timestamp} ${level.toUpperCase()}: ${message}`;
        }),
        colorize({ all: true }),
      ),
    };

    return new winston.transports.Console({
      level,
      ...DEFAULT_LOG_OPTIONS,
      ...consoleFormat,
    });
  }

  static getFileTransport(appName: string, appVersion?: string, level = LogLevel.info): winston.transport {
    const fileFormat = {
      dirname: path.resolve(__dirname, DEFAULT_LOG_FOLDER_NAME),
      filename: `${appName}${DEFAULT_LOG_FILENAME_EXT}`,
      options: { flags: 'a' },
      format: combine(
        {
          ...transformWinstonFormat,
        },
        json(),
        timestamp(),
      ),
      colorize: false,
    };

    return new winston.transports.File({
      level,
      ...DEFAULT_LOG_OPTIONS,
      ...fileFormat,
    });
  }

  static getTransports({
    appName,
    appVersion,
    transportType,
    logLevel,
  }: {
    appName: string;
    appVersion?: string;
    transportType?: TransportType;
    logLevel?: LogLevel;
  }): winston.transport[] {
    const transports: winston.transport[] = [];

    if (transportType === TransportType.FILE) {
      transports.push(TransportFactory.getFileTransport(appName, appVersion, logLevel));
    } else {
      transports.push(TransportFactory.getConsoleTransport(appName, appVersion, logLevel));
    }

    return transports;
  }
}

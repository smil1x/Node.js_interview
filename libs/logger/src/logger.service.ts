import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { createLogger, Logger } from 'winston';
import { LOGGER_CONFIG } from '@app/logger/consts';
import { LoggerConfigInterface } from '@app/logger/interfaces';
import { TransportFactory } from '@app/logger/transport.factory';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: Logger;

  constructor(@Inject(LOGGER_CONFIG) private config: LoggerConfigInterface) {
    this.logger = createLogger({
      transports: TransportFactory.getTransports(config),
    });
  }

  log(message: any, ...params: any[]): void {
    this.logger.info(message, ...params);
  }

  warn(message: any, ...params: any[]): void {
    this.logger.warn(message, ...params);
  }

  error(message: any, ...params: any[]): void {
    this.logger.error(message, ...params);
  }

  verbose(message: any, ...params: any[]): void {
    this.logger.verbose(message, ...params);
  }

  debug(message: any, ...params: any[]): void {
    this.logger.debug(message, ...params);
  }

  silly(message: any, ...params: any[]): void {
    this.logger.silly(message, ...params);
  }
}

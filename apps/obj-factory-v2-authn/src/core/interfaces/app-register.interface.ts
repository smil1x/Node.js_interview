import { CertsOptionsInterface } from '@app/common/interfaces/certs-options.interface';
import { BaseConfigInterface } from './base-config.interface';

export interface AppRegisterOptions {
  config: BaseConfigInterface;
  certs?: CertsOptionsInterface;
}

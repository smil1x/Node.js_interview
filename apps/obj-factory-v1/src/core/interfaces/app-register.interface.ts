import { CertsOptionsInterface } from '@app/common/interfaces';
import { BaseConfigInterface } from './base-config.interface';

export interface AppRegisterOptions {
  config: BaseConfigInterface;
  certs?: CertsOptionsInterface;
}

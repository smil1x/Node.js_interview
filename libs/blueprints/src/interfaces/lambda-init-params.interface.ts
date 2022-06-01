import { DynamicModule } from '@nestjs/common';

interface RegisterParams<T> {
  config: T;
  certs?: any;
}

export interface InitParams<T> {
  appName: string;
  configSchema: any;
  rootModule: { register: (params: RegisterParams<T>) => DynamicModule };
}

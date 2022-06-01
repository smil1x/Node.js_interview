import { ConfigOptionsInterface } from '@app/config/interfaces/config-options.interface';
import { getSchema } from '../config-schema';

export const configOptions: ConfigOptionsInterface = {
  providedSchema: getSchema(),
  appName: 'obj-viewer-api',
};

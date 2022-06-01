import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { COMMON_OPTIONS, CONFIG, FS_LIB } from '@app/common/consts';

const baseConfigProvider = (config): ValueProvider => ({
  provide: CONFIG,
  useValue: config,
});

const commonOptionsProvider = (commonOptions): ValueProvider => ({
  provide: COMMON_OPTIONS,
  useValue: commonOptions,
});

const fileSystemProvider = (fileSystem): ValueProvider => ({
  provide: FS_LIB,
  useValue: fileSystem,
});

export const OptionsProvider = {
  baseConfigProvider,
  commonOptionsProvider,
  fileSystemProvider,
};

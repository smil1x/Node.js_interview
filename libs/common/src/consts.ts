import { Workspace } from './enums';
export const TERRAFORM_WORKSPACE = process.env.TERRAFORM_WORKSPACE || Workspace.DEVELOPMENT;

// Custom Provider Tokens
export const CONFIG = 'CONFIG';
export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';
export const COMMON_OPTIONS = 'COMMON_OPTIONS';
export const FS_LIB = 'FS_LIB';

export const DEFAULT_VALIDATION_OPTIONS = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
};

export const logLevelsValues = ['info', 'error', 'warn', 'debug', 'verbose', 'silly'];
export const transportTypesValues = ['Console', 'File'];

// Custom Provider Tokens
export const LOGGER_CONFIG = 'LOGGER_CONFIG';

export const DEFAULT_TIME_FORMAT = 'MM/DD/YYYY, HH:mm:ss';
export const JSON_FORMAT_SPACES = 3;
export const DEFAULT_LOG_FOLDER_NAME = 'logs';
export const DEFAULT_LOG_FILENAME_EXT = '.log';

export const DEFAULT_LOG_OPTIONS = {
  handleExceptions: true,
  handleRejections: true,
};

export const enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

export const enum TransportType {
  CONSOLE = 'Console',
  FILE = 'File',
}

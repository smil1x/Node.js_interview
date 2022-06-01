import { omit, merge, set } from 'lodash';

export const restructureConfig = (rawConfig) => {
  return Object.keys(rawConfig).reduce((config, key) => {
    set(config, key.replace('__', '.'), rawConfig[key]);
    return config;
  }, {});
};

export const objNotFoundMsg = (id: number | string, additionalMsg?: string): string => {
  const defaultMsg = `Object with id ${id} is not found`;
  return additionalMsg ? `${defaultMsg}, ${additionalMsg}` : defaultMsg;
};

export const fileNotFoundMsg = (parameter: string, value: string, additionalMsg?: string): string => {
  const defaultMsg = `File with ${parameter}: ${value} is not found.`;
  return additionalMsg ? `${defaultMsg} ${additionalMsg}` : defaultMsg;
};

export const lodashOmit = (obj: any, paths: string[]) => omit(obj, paths) as any;
export const lodashMerge = (obj: any, ...sources) => merge(obj, ...sources);

export const formatString = (str: string) => {
  return str.replace(/[\s\/.-]+/g, '_');
};

export const getExtensionFromName = (fileOriginalName) => {
  return fileOriginalName.split('.').pop();
};

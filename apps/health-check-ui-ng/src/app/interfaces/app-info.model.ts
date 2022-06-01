import { GitInfoModel } from './git-info.model';

export interface AppInfoModel {
  appDescription?: AppDescriptionModel;
  indicators?: IndicatorModel[];
  git?: GitInfoModel;
  err?: string;
}

interface AppDescriptionModel {
  info: string;
  stack: string[];
}

interface IndicatorModel {
  name: string;
  status: string;
  info: GitInfoModel;
}

export interface ErrorInfoModel {
  err: string;
}

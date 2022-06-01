export interface AppListItemModel {
  id: number;
  name: string;
  isHealthDev: boolean;
  isHealthProd: boolean;
  healthDev?: string;
  healthProd?: string;
  linkDev: string;
  linkProd: string;
}

import { Injectable } from '@angular/core';
import { AppListItemModel } from '../interfaces/app-list-item.model';
import { appList } from '../constants/app-list';

@Injectable({ providedIn: 'root' })
export class AppListService {
  private appList: AppListItemModel[] = appList;

  getAppList(devType: boolean): AppListItemModel[] {
    return this.appList;
  }
}

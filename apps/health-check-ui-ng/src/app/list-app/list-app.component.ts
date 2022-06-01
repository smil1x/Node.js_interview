import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { AppListService } from '../services/app-list.service';
import { AppListItemModel } from '../interfaces/app-list-item.model';
import { InfoService } from '../services/info.service';
import { HEALTH_PAGE } from '../constants/routes-constants';
import { DEVELOP_LABEL, PRODUCTION_LABEL } from '../constants/constants';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-app.component.html',
  styleUrls: ['./list-app.component.scss'],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'app-list-menu-overlay' },
    },
  ],
})
export class ListAppComponent implements OnInit {
  appsList!: AppListItemModel[];
  appInfo$ = this.infoService.infoSub$;
  devType = true;
  selectedApp: any;
  loading = false;

  selectedIndex: number = 0;

  constructor(private appListService: AppListService, private infoService: InfoService, private router: Router) {
    router.events.subscribe((routerEvent: any) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {
    this.appsList = this.appListService.getAppList(this.devType);
  }

  clickMe(link: string) {
    this.getHealthInTab(link);
    this.selectedIndex = 1;
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  getHealthInTab(link: string) {
    this.infoService.getInfo(link);
  }

  getHealth(path: any): void {
    this.infoService.getInfo(this.devType ? path.healthDev : path.healthProd);
    this.router.navigate([HEALTH_PAGE]);
  }

  changeType(): void {
    this.devType = !this.devType;
    if (this.selectedApp) {
      this.infoService.getInfo(this.devType ? this.selectedApp.healthDev : this.selectedApp.healthProd);
    }
  }

  get typeName(): string {
    return this.devType ? DEVELOP_LABEL : PRODUCTION_LABEL;
  }

  setDev() {
    this.devType = true;
  }

  setProd() {
    this.devType = false;
  }
}

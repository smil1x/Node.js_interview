import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { AppInfoModel } from '../interfaces/app-info.model';
import { getRamValue, getFirstTime, updateTime, parseTime, parseToDateTime } from './time-helper';
import { gitInfoIcons, gitInfoKeys } from '../constants/git-info';
import { APP_UPTIME, DEV_TYPE, OS_UPTIME } from '../constants/constants';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  @Input() appData: AppInfoModel = { indicators: [] };

  ramSpinnerValue: any;
  info: any = {};
  timeOS!: any;
  timeApp!: any;
  dateTimeOS!: string;
  dateTimeApp!: string;
  loading = true;
  parseTime = parseTime;
  getRamValue = getRamValue;
  gitInfoKeys = gitInfoKeys;
  gitInfoIcons = gitInfoIcons;
  dev = false;
  appName!: string;
  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((routerEvent: any) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {
    this.appData = this.route.snapshot.data.appInfo$;
    if (!this.appData.err) {
      this.prepareData(this.appData);
      this.timeOS = getFirstTime(this.info[OS_UPTIME].rawTime);
      this.timeApp = getFirstTime(this.info[APP_UPTIME].rawTime);
      this.dateTimeOS = parseToDateTime(this.info[OS_UPTIME].rawTime);
      this.dateTimeApp = parseToDateTime(this.info[APP_UPTIME].rawTime);
      this.startTimer();

      this.appName = this.route.snapshot.params.appName;
      this.dev = this.route.snapshot.params.appName.includes(DEV_TYPE);
    }
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  startTimer() {
    setInterval(() => {
      this.timeOS = updateTime(this.timeOS);
      this.timeApp = updateTime(this.timeApp);
    }, 1000);
  }

  prepareData(data: any): void {
    data.indicators.forEach((indicator: any) => {
      this.info[indicator.name] = indicator.info;
    });
  }
}

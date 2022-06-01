import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { APP_HEALTH_DATA_MISS } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class InfoService {
  private reloadInfoSub$ = new BehaviorSubject(null);
  private appHealthLink!: string;
  isLoadingSubj$ = new BehaviorSubject(false);

  infoSub$ = this.reloadInfoSub$.pipe(
    tap(() => {
      this.isLoadingSubj$.next(true);
    }),
    switchMap(() => {
      if (!this.appHealthLink || this.appHealthLink === APP_HEALTH_DATA_MISS) return of(EMPTY);
      return this.apiService.getInfo(`${this.appHealthLink}`);
    }),
    tap(() => {
      this.isLoadingSubj$.next(false);
    }),
    catchError(() => {
      return EMPTY;
    }),
  );

  constructor(private apiService: ApiService) {}

  setAppHealthLink(link: string): void {
    this.appHealthLink = link;
  }

  getInfo(link: string): void {
    this.setAppHealthLink(link);
    this.reloadInfoSub$.next(null);
  }
}

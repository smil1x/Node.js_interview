import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { InfoService } from './info.service';
import { NOT_FOUND_PAGE } from '../constants/routes-constants';
import { APP_PARAM } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class HealthPageResolverService implements Resolve<any> {
  constructor(private apiService: ApiService, private router: Router, private infoService: InfoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const appName = route.paramMap.get(APP_PARAM)?.toString();

    return this.apiService.getInfo(`${appName}`).pipe(
      catchError(() => {
        this.router.navigate([NOT_FOUND_PAGE]);
        return EMPTY;
      }),
    );
  }
}

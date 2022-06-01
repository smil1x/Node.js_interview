import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppInfoModel } from '../interfaces/app-info.model';
import { API_HEALTH } from '../constants/routes-constants';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getInfo(appName: string, params?: HttpParams): Observable<AppInfoModel | any> {
    return this.http.get(`https://${appName}${API_HEALTH}`, { params }).pipe(
      catchError(() => {
        return of({ err: 'Information is not available.' });
      }),
    );
  }
}

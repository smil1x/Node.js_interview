import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppComponent } from './list-app/list-app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HealthPageResolverService } from './services/health-page-resolver.service';
import { InfoPageComponent } from './info-page/info-page.component';
import {
  MAIN_DATA_TITLE,
  LOGIN_DATA_TITLE,
  HEALTH_DATA_TITLE,
  NOT_FOUND_DATA_TITLE,
  MAIN_ROUTE,
  LOGIN_ROUTE,
  HEALTH_ROUTE,
  NOT_FOUND_ROUTE,
} from './constants/routes-constants';

const routes: Routes = [
  {
    path: MAIN_ROUTE,
    component: ListAppComponent,
    canActivate: [AuthGuard],
    data: { title: MAIN_DATA_TITLE },
  },
  {
    path: LOGIN_ROUTE,
    component: LoginPageComponent,
    data: { title: LOGIN_DATA_TITLE },
  },
  {
    path: HEALTH_ROUTE,
    component: InfoPageComponent,
    canActivate: [AuthGuard],
    data: { title: HEALTH_DATA_TITLE },
    resolve: {
      appInfo$: HealthPageResolverService,
    },
  },
  {
    path: NOT_FOUND_ROUTE,
    component: PageNotFoundComponent,
    data: { title: NOT_FOUND_DATA_TITLE },
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { InfoPageComponent } from './info-page/info-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListAppComponent } from './list-app/list-app.component';
import { environment } from '../environments/environment';
import { msConfig } from '../environments/ms-config';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: msConfig.CLIENT_ID,
      authority: msConfig.AUTH_KEY,
      redirectUri: environment.CLIENT_URL,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE,
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map([
    [
      environment.SERVER_URL,
      [
        {
          httpMethod: 'GET',
          scopes: [msConfig.SCOPE],
        },
        {
          httpMethod: 'POST',
          scopes: [msConfig.SCOPE],
        },
        {
          httpMethod: 'PATCH',
          scopes: [msConfig.SCOPE],
        },
        {
          httpMethod: 'PUT',
          scopes: [msConfig.SCOPE],
        },
        {
          httpMethod: 'DELETE',
          scopes: [msConfig.SCOPE],
        },
      ],
    ],
    [msConfig.GRAPH_PATH, [msConfig.USER_GRAPH]],
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [msConfig.SCOPE],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    HeaderComponent,
    FooterComponent,
    ListAppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MsalModule,
    RoundProgressModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalInterceptor,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}

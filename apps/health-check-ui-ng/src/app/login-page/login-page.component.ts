import { Component, Inject, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ROOT_PAGE } from '../constants/routes-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private destroying$ = new Subject<void>();

  constructor(
    private msalService: MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private router: Router,
    private broadcastService: MsalBroadcastService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$),
      )
      .subscribe(() => {
        if (this.msalService.instance.getAllAccounts().length > 0) {
          this.router.navigate([ROOT_PAGE]);
        }
      });
  }

  login(): void {
    this.authService.login();
  }
}

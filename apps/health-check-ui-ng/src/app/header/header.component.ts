import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter, takeUntil } from 'rxjs/operators';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLogout = false;
  private destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private msalService: MsalService,
    private broadcastService: MsalBroadcastService,
  ) {}

  ngOnInit(): void {
    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$),
      )
      .subscribe(() => {
        if (this.msalService.instance.getAllAccounts().length > 0) {
          this.showLogout = true;
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}

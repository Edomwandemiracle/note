import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { CredentialsService } from '../credentials/credentials.service';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private notifyService: NotificationsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    } else {
      // this.notifyService.publishMessages('Kindly login to proceed', 'warning', 1);
      this.credentialsService.setCredentials();
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }

  }
}

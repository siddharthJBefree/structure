import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

export const ipGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isValidIp = new Observable<boolean>((obs) => {
    const isValidIpObs = authService.checkIp().subscribe({
      next: (success) => {
        if (success.payload.success === '1') obs.next(true);
        else router.navigate(['/error/401'], {queryParams: {error: JSON.stringify(success)}});
      },
      error: (error) => {
        console.log(error);
        obs.next(false);
        isValidIpObs.unsubscribe();
      },
      complete: () => {
        isValidIpObs.unsubscribe();
      }
    });
  });

  return isValidIp;
};

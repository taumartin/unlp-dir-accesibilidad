import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/core/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/login'], {queryParams: {r: btoa(state.url)}});
  return false;
};

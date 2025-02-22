import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/core/auth/auth.service';
import {ToastService} from '../../services/ui/toast/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return true;
  }
  const router = inject(Router);
  const toastService = inject(ToastService);
  toastService.showInfoToast("Ingresa con tu usuario para poder acceder a la página.",
    "La página solicitada requiere login");
  router.navigate(['/auth/login'], {queryParams: {r: btoa(state.url)}});
  return false;
};

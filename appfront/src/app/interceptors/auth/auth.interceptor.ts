import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../services/core/auth/auth.service';
import {inject} from '@angular/core';
import {ApiService} from '../../services/network/api/api.service';
import {catchError, switchMap, throwError} from 'rxjs';

const _reqWithAccessToken = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiService = inject(ApiService);
  const authService = inject(AuthService);

  let nextReq = req;
  if (apiService.isApiUrl(req.url) && authService.isLoggedIn()) {
    nextReq = _reqWithAccessToken(req, authService.getAccessToken());
  }

  return next(nextReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if ((error.status === 403) && apiService.isApiUrl(error.url || req.url) && authService.isLoggedIn()) {
          return authService.refreshToken()
            .pipe(
              switchMap(() => next(_reqWithAccessToken(nextReq, authService.getAccessToken()))),
              catchError(() => {
                authService.logout().subscribe();
                return throwError(() => new Error('Sesión expirada.'));
              })
            );
        }
        return throwError(() => error);
      })
    );
};

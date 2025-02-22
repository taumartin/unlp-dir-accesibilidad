import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {AuthLoginSuccessResponse} from './auth-login-success-response';
import {ApiSuccessResponse} from '../../network/api/api-success-response';
import {ApiErrorResponse} from '../../network/api/api-error-response';
import {ToastService} from '../../ui/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseEndpoint: string = "/auth";
  private _accessToken: string | null = null;

  private readonly userAuthChangeSubject = new BehaviorSubject<boolean>(false);
  public userAuthChange$ = this.userAuthChangeSubject.asObservable();

  constructor(
    private readonly apiService: ApiService,
    private readonly toastService: ToastService,
  ) {
  }

  public isLoggedIn(): boolean {
    return this._accessToken !== null
  }

  private saveAccessToken(accessToken: string): void {
    this._accessToken = accessToken;
    this.userAuthChangeSubject.next(true);
  }

  private clearAccessToken(): void {
    this._accessToken = null;
    this.userAuthChangeSubject.next(false);
  }

  public getAccessToken(): string {
    if (this.isLoggedIn()) {
      return this._accessToken!;
    }
    throw new Error('Usuario no logeado.');
  }

  public signup(email: string, password: string): Observable<ApiSuccessResponse<void> | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse<void>>(`${this.baseEndpoint}/signup`, {
      email,
      password,
    });
  }

  public login(email: string, password: string): Observable<AuthLoginSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<AuthLoginSuccessResponse>(`${this.baseEndpoint}/login`, {
      email,
      password,
    }).pipe(
      tap((response) => {
        if (response.success) {
          this.saveAccessToken(response.data.accessToken);
        }
      })
    );
  }

  public silentLogin() {
    this.refreshToken().subscribe({
      next: (result) => {
        if (result.success) {
          this.toastService.showStandardToast('Recuperado sesión previa.');
        }
      }
    });
  }

  public refreshToken(): Observable<AuthLoginSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<AuthLoginSuccessResponse>(`${this.baseEndpoint}/refresh`)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.saveAccessToken(response.data.accessToken);
          } else if (this.isLoggedIn()) {
            this.logout().subscribe();
          }
        })
      );
  }

  public logout(): Observable<ApiSuccessResponse<void> | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse<void>>(`${this.baseEndpoint}/logout`)
      .pipe(
        tap((response) => {
          this.clearAccessToken();
          if (!response.success) {
            this.toastService.showStandardToast('No se pudo eliminar la sesión remota. Se cerró la sesión local.');
          }
        })
      );
  }

  public me(): Observable<ApiSuccessResponse<{ email: string; }>> {
    return this.apiService.getEndpoint<ApiSuccessResponse<{ email: string; }>>(`${this.baseEndpoint}/me`);
  }
}

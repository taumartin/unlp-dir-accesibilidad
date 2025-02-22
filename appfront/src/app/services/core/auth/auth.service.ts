import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Observable, tap} from 'rxjs';
import {AuthLoginSuccessResponse} from './auth-login-success-response';
import {ApiSuccessResponse} from '../../network/api/api-success-response';
import {ApiErrorResponse} from '../../network/api/api-error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseEndpoint: string = "/auth";
  private _accessToken: string | null = null;

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public isLoggedIn(): boolean {
    return this._accessToken !== null
  }

  private saveAccessToken(accessToken: string): void {
    this._accessToken = accessToken;
  }

  private clearAccessToken(): void {
    this._accessToken = null;
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

  public refreshToken(): Observable<AuthLoginSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<AuthLoginSuccessResponse>(`${this.baseEndpoint}/refresh`)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.saveAccessToken(response.data.accessToken);
          }
        })
      );
  }

  public logout(): Observable<ApiSuccessResponse<void> | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse<void>>(`${this.baseEndpoint}/login`)
      .pipe(
        tap((response) => {
          this.clearAccessToken();
        })
      );
  }

  public me(): Observable<ApiSuccessResponse<{ email: string; }>> {
    return this.apiService.getEndpoint<ApiSuccessResponse<{ email: string; }>>(`${this.baseEndpoint}/me`);
  }
}

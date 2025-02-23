import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, map, Observable, of} from 'rxjs';
import {ApiErrorResponse} from './api-error-response';
import {ApiSuccessResponse} from './api-success-response';
import {ApiPaginatedSuccessResponse} from './api-paginated-success-response';
import {ApiResponsePage} from './api-response-page';
import {ApiPageRequest} from './api-page-request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  private parseApiError<T extends ApiErrorResponse>(error: HttpErrorResponse): T {
    if (error.status === 0) {
      return {
        status: 0,
        success: false,
        message: 'No hay conexión con el servidor o la solicitud fue bloqueada.',
        error: {},
      } as T;
    }

    if (error.error && typeof error.error === 'object') {
      return error.error as T;
    }

    return {
      status: error.status || 500,
      success: false,
      message: 'Ocurrió un error inesperado.',
      error: {},
    } as T;
  }

  public isApiUrl(url: string): boolean {
    return url.startsWith(this.baseUrl);
  }

  public getEndpoint<T extends ApiSuccessResponse = ApiSuccessResponse,
    U extends ApiErrorResponse = ApiErrorResponse>(endpoint: string, params?: any): Observable<T | U> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {params, withCredentials: true})
      .pipe(
        catchError((error: HttpErrorResponse) => of(this.parseApiError<U>(error)))
      );
  }

  public getPaginatedEndpoint<T>(endpoint: string, params: ApiPageRequest): Observable<ApiResponsePage<T>> {
    return this.getEndpoint<ApiPaginatedSuccessResponse<T>>(endpoint, params)
      .pipe(
        map(response => {
          if (response.success) {
            return response.data;
          }
          throw response;
        })
      );
  }

  public postEndpoint<T extends ApiSuccessResponse = ApiSuccessResponse,
    U extends ApiErrorResponse = ApiErrorResponse>(endpoint: string, payload?: any): Observable<T | U> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, payload, {withCredentials: true})
      .pipe(
        catchError((error: HttpErrorResponse) => of(this.parseApiError<U>(error)))
      );
  }

  // TODO: agregar, delete...
}

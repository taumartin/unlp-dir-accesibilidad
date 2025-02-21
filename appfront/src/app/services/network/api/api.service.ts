import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public isApiUrl(url: string): boolean {
    return url.startsWith(this.baseUrl);
  }

  public getEndpoint<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params
    });
  }

  public postEndpoint<T>(endpoint: string, payload?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, payload, {withCredentials: true});
  }

  // TODO: agregar, delete...
}

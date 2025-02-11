import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public get() {
    this.http.get(this.baseUrl).subscribe(res => {
      console.log(res)
    });
  }
}

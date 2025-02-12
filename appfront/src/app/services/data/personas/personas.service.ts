import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Persona} from '../../../models/persona';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {ApiPageRequest} from '../../network/api/api-page-request';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private readonly baseEndpoint: string = "/personas";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getPersonas(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Persona>> {
    return this.apiService.getEndpoint<ApiResponsePage<Persona>>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

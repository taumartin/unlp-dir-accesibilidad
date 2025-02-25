import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Persona} from '../../../models/persona';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {ApiSuccessResponse} from '../../network/api/api-success-response';
import {ApiErrorResponse} from '../../network/api/api-error-response';

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
    return this.apiService.getPaginatedEndpoint<Persona>(`${this.baseEndpoint}/`, pageRequested);
  }

  public getPersonaById(id: number): Observable<ApiSuccessResponse<Persona> | ApiErrorResponse> {
    return this.apiService.getEndpoint<ApiSuccessResponse<Persona>>(`${this.baseEndpoint}/${id}`);
  }

  public createPersona(persona: Omit<Persona, 'id'>): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/`, persona);
  }

  public updatePersona(id: number, persona: Partial<Persona>): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/${id}`, persona);
  }

  public deletePersona(id: number): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.deleteEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/${id}`);
  }

  public isPersonaModified(original: Persona, newValues: Partial<Omit<Persona, 'id'>>): boolean {
    return (original.nombre !== newValues.nombre) || (original.apellido !== newValues.apellido)
      || (original.dni !== newValues.dni) || (original.email !== newValues.email)
      || (original.telefono !== newValues.telefono);
  }
}

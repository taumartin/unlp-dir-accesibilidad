import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {Materia} from '../../../models/materia';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private readonly baseEndpoint: string = "/materias";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getMaterias(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Materia>> {
    return this.apiService.getPaginatedEndpoint<Materia>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

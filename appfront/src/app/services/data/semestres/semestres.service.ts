import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {Semestre} from '../../../models/semestre';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class SemestresService {
  private readonly baseEndpoint: string = "/semestres";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getSemestres(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Semestre>> {
    return this.apiService.getPaginatedEndpoint<Semestre>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

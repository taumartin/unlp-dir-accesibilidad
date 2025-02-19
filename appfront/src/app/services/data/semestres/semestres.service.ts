import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {Semestre} from '../../../models/semestre';

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
    return this.apiService.getEndpoint<ApiResponsePage<Semestre>>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

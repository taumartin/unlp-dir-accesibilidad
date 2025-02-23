import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {TipoEvento} from '../../../models/tipo-evento';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class TiposEventosService {
  private readonly baseEndpoint: string = "/tipos-eventos";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getTiposEventos(pageRequested: ApiPageRequest): Observable<ApiResponsePage<TipoEvento>> {
    return this.apiService.getPaginatedEndpoint<TipoEvento>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {Usuario} from '../../../models/usuario';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly baseEndpoint: string = "/usuarios";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getUsuarios(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Usuario>> {
    return this.apiService.getPaginatedEndpoint<Usuario>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {TipoMaterial} from '../../../models/tipo-material';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class TiposMaterialesService {
  private readonly baseEndpoint: string = "/tipos-materiales";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getTiposMateriales(pageRequested: ApiPageRequest): Observable<ApiResponsePage<TipoMaterial>> {
    return this.apiService.getPaginatedEndpoint<TipoMaterial>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

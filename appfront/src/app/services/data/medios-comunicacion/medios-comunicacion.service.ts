import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable} from 'rxjs';
import {MedioComunicacion} from '../../../models/medio-comunicacion';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class MediosComunicacionService {
  private readonly baseEndpoint: string = "/medios-comunicacion";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getMediosComunicacion(pageRequested: ApiPageRequest): Observable<ApiResponsePage<MedioComunicacion>> {
    return this.apiService.getPaginatedEndpoint<MedioComunicacion>(`${this.baseEndpoint}/`, pageRequested);
  }

  // TODO: agregar resto de operaciones..
}

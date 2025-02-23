import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {Evento} from '../../../models/evento';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private readonly baseEndpoint: string = "/eventos";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getEventos(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Evento>> {
    return this.apiService.getPaginatedEndpoint<Evento>(`${this.baseEndpoint}/`, pageRequested)
      .pipe(
        tap(response => {
          response.data.forEach(item => item._timestamp = new Date(item.fechaYHora));
        })
      );
  }

  // TODO: agregar resto de operaciones..
}

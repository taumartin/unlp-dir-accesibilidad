import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {Evento} from '../../../models/evento';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends CrudService<Evento> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/eventos");
  }

  public override listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Evento>> {
    return super.listAll(pageRequested)
      .pipe(
        tap(response => {
          response.data.forEach(item => item._timestamp = new Date(item.fechaYHora));
        })
      );
  }

  public isModified(original: Evento, newValues: Partial<Omit<Evento, "id">>): boolean {
    // FIXME: revisar comparación de fecha y hora.
    return (original.descripcion !== newValues.descripcion) || (original.fechaYHora !== newValues.fechaYHora);
  }
}

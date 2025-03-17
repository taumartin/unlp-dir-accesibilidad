import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {Evento} from '../../../models/evento';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {CrudService} from '../crud/crud.service';
import {DatesService} from '../dates/dates.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends CrudService<Evento> {
  constructor(
    apiService: ApiService,
    private readonly datesService: DatesService,
  ) {
    super(apiService, "/eventos");
  }

  private parseDate(evento: Evento): Evento {
    evento._timestamp = this.datesService.isoStringToDateLocale(evento.fechaYHora);
    evento._dateTimeString = this.datesService.dateLocaleToInputString(evento._timestamp);
    return evento;
  }

  public override listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Evento>> {
    return super.listAll(pageRequested)
      .pipe(
        tap(response => {
          response.data = response.data.map(evento => this.parseDate(evento));
        })
      );
  }

  public override isModified(original: Evento, newValues: Partial<Omit<Evento, "id">>): boolean {
    return (original.descripcion !== newValues.descripcion) || (original._dateTimeString !== newValues.fechaYHora);
  }
}

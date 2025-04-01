import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {Reunion} from '../../../models/reunion';
import {ApiService} from '../../network/api/api.service';
import {DatesService} from '../dates/dates.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService extends CrudService<Reunion> {
  constructor(
    apiService: ApiService,
    private readonly datesService: DatesService,
  ) {
    super(apiService, "/reuniones");
  }

  private parseDate(reunion: Reunion): Reunion {
    reunion._timestamp = this.datesService.isoStringToDateTimeLocale(reunion.fechaYHora);
    reunion._dateTimeString = this.datesService.dateTimeLocaleToInputString(reunion._timestamp);
    return reunion;
  }

  public override listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<Reunion>> {
    return super.listAll(pageRequested)
      .pipe(
        tap(response => {
          response.data = response.data.map(reunion => this.parseDate(reunion));
        })
      );
  }

  public override isModified(original: Reunion, newValues: Partial<Omit<Reunion, "id">>): boolean {
    return (original.medioComunicacionId !== newValues.medioComunicacionId) || (original.tutorId !== newValues.tutorId) ||
      (original.alumnoId !== newValues.alumnoId) || (original.materiaId !== newValues.materiaId) ||
      (original._dateTimeString !== newValues.fechaYHora) || (original.observaciones !== newValues.observaciones);
  }
}

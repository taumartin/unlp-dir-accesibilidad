import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {MaterialAccesibilizado} from '../../../models/material-accesibilizado';
import {ApiService} from '../../network/api/api.service';
import {Evento} from '../../../models/evento';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {DatesService} from '../dates/dates.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialesAccesibilizadosService extends CrudService<MaterialAccesibilizado> {
  constructor(
    apiService: ApiService,
    private readonly datesService: DatesService,
  ) {
    super(apiService, "/materiales-accesibilizados");
  }

  private parseDate(evento: MaterialAccesibilizado): MaterialAccesibilizado {
    evento._timestamp = this.datesService.isoStringToDateLocale(evento.fechaPublicacion);
    evento._dateTimeString = this.datesService.dateLocaleToInputString(evento._timestamp);
    return evento;
  }

  public override listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<MaterialAccesibilizado>> {
    return super.listAll(pageRequested)
      .pipe(
        tap(response => {
          response.data = response.data.map(evento => this.parseDate(evento));
        })
      );
  }

  public override isModified(original: MaterialAccesibilizado, newValues: Partial<Omit<MaterialAccesibilizado, "id">>): boolean {
    return (original.tipoMaterialId !== newValues.tipoMaterialId) || (original.titulo !== newValues.titulo) ||
      (original.link !== newValues.link) || (original.materiaId !== newValues.materiaId) ||
      (original._dateTimeString !== newValues.fechaPublicacion);
  }
}

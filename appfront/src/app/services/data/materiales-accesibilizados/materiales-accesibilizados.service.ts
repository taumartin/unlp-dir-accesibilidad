import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {MaterialAccesibilizado} from '../../../models/material-accesibilizado';
import {ApiService} from '../../network/api/api.service';
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

  private parseDate(material: MaterialAccesibilizado): MaterialAccesibilizado {
    material._timestamp = this.datesService.isoStringToDateTimeLocale(material.fechaPublicacion);
    material._dateTimeString = this.datesService.dateTimeLocaleToInputString(material._timestamp);
    return material;
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

import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {TutorTrabajoEnMaterial} from '../../../models/tutor-trabajo-en-material';
import {ApiService} from '../../network/api/api.service';
import {DatesService} from '../dates/dates.service';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {Observable, tap} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';

@Injectable({
  providedIn: 'root'
})
export class TutoresTrabajosEnMaterialesService extends CrudService<TutorTrabajoEnMaterial> {

  constructor(
    apiService: ApiService,
    private readonly datesService: DatesService,
  ) {
    super(apiService, "/tutores-trabajos-en-materiales");
  }

  private parseDate(trabajo: TutorTrabajoEnMaterial): TutorTrabajoEnMaterial {
    trabajo._timestamp = this.datesService.isoStringToDateLocale(trabajo.fecha);
    trabajo._dateString = this.datesService.dateLocaleToInputString(trabajo._timestamp);
    return trabajo;
  }

  public override listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<TutorTrabajoEnMaterial>> {
    return super.listAll(pageRequested)
      .pipe(
        tap(response => {
          response.data = response.data.map(trabajo => this.parseDate(trabajo));
        })
      );
  }

  public override isModified(original: TutorTrabajoEnMaterial, newValues: Partial<Omit<TutorTrabajoEnMaterial, "id">>): boolean {
    return (original.tutorId !== newValues.tutorId) || (original.materialAccesibilizadoId !== newValues.materialAccesibilizadoId) ||
      (original.minutosTrabajados !== newValues.minutosTrabajados) || (original._dateString !== newValues.fecha);
  }
}

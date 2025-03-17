import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Semestre} from '../../../models/semestre';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SemestresService extends CrudService<Semestre> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/semestres");
  }

  public override isModified(original: Semestre, newValues: Partial<Omit<Semestre, "id">>): boolean {
    return (original.anio !== newValues.anio) || (original.esPrimerSemestre !== newValues.esPrimerSemestre);
  }
}

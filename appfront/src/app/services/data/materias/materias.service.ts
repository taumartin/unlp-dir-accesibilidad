import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Materia} from '../../../models/materia';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService extends CrudService<Materia> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/materias");
  }

  public override isModified(original: Materia, newValues: Partial<Omit<Materia, "id">>): boolean {
    return (original.nombre !== newValues.nombre) || (original.docentes !== newValues.docentes) ||
      (original.contacto !== newValues.contacto);
  }
}

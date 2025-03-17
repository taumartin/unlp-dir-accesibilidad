import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Persona} from '../../../models/persona';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService extends CrudService<Persona> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/personas");
  }

  public override isModified(original: Persona, newValues: Partial<Omit<Persona, 'id'>>): boolean {
    return (original.nombre !== newValues.nombre) || (original.apellido !== newValues.apellido)
      || (original.dni !== newValues.dni) || (original.email !== newValues.email)
      || (original.telefono !== newValues.telefono);
  }
}

import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {Alumno} from '../../../models/alumno';
import {ApiService} from '../../network/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService extends CrudService<Alumno> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/alumnos");
  }

  public override isModified(original: Alumno, newValues: Partial<Omit<Alumno, "id">>): boolean {
    return (original.personaId !== newValues.personaId) || (original.legajo !== newValues.legajo) ||
      (original.tieneCertificado !== newValues.tieneCertificado) || (original.situacion !== newValues.situacion);
  }
}

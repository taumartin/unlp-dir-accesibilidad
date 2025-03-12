import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {Tutor} from '../../../models/tutor';
import {ApiService} from '../../network/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TutoresService extends CrudService<Tutor> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/tutores");
  }

  public isModified(original: Tutor, newValues: Partial<Omit<Tutor, "id">>): boolean {
    return (original.personaId !== newValues.personaId) || (original.usuarioId !== newValues.usuarioId) ||
      (original.horasAsignadas !== newValues.horasAsignadas);
  }
}

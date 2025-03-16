import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {ApiService} from '../../network/api/api.service';
import {Apoyo} from '../../../models/apoyo';

@Injectable({
  providedIn: 'root'
})
export class ApoyosService extends CrudService<Apoyo> {

  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/apoyos");
  }

  isModified(original: Apoyo, newValues: Partial<Omit<Apoyo, "id">>): boolean {
    return (original.semestreId !== newValues.semestreId) || (original.tutorId !== newValues.tutorId) ||
      (original.alumnoId !== newValues.alumnoId);
  }
}

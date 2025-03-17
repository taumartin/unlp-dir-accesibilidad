import {Injectable} from '@angular/core';
import {CrudService} from '../crud/crud.service';
import {Ayudantia} from '../../../models/ayudantia';
import {ApiService} from '../../network/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AyudantiasService extends CrudService<Ayudantia> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/ayudantias");
  }

  public override isModified(original: Ayudantia, newValues: Partial<Omit<Ayudantia, 'id'>>): boolean {
    return (original.semestreId !== newValues.semestreId) || (original.tutorId !== newValues.tutorId) ||
    (original.materiaId !== newValues.materiaId);
  }
}

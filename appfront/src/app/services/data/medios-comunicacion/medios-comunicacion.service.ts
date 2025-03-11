import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {MedioComunicacion} from '../../../models/medio-comunicacion';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MediosComunicacionService extends CrudService<MedioComunicacion> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/medios-comunicacion");
  }

  public isModified(original: MedioComunicacion, newValues: Partial<Omit<MedioComunicacion, "id">>): boolean {
    return (original.nombre !== newValues.nombre);
  }
}

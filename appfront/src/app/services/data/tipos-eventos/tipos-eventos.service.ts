import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {TipoEvento} from '../../../models/tipo-evento';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class TiposEventosService extends CrudService<TipoEvento> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/tipos-eventos");
  }

  public isModified(original: TipoEvento, newValues: Partial<Omit<TipoEvento, "id">>): boolean {
    return (original.nombre !== newValues.nombre);
  }
}

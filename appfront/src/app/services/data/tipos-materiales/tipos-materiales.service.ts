import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {TipoMaterial} from '../../../models/tipo-material';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class TiposMaterialesService extends CrudService<TipoMaterial> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/tipos-materiales");
  }

  public isModified(original: TipoMaterial, newValues: Partial<Omit<TipoMaterial, "id">>): boolean {
    return (original.nombre !== newValues.nombre);
  }
}

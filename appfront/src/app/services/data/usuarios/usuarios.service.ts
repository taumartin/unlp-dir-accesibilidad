import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Usuario} from '../../../models/usuario';
import {CrudService} from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends CrudService<Usuario> {
  constructor(
    apiService: ApiService,
  ) {
    super(apiService, "/usuarios");
  }

  public override isModified(original: Usuario, newValues: Partial<Omit<Usuario, "id">>): boolean {
    return (original.username !== newValues.username) || (original.correo !== newValues.correo)
      || (original.fotoPerfil !== newValues.fotoPerfil) || (original.esAdmin !== newValues.esAdmin)
      || (original.estaActivo !== newValues.estaActivo);
  }
}

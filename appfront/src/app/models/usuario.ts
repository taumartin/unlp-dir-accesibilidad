import {Model} from './model';

export interface Usuario extends Model {
  username: string;
  estaActivo: boolean;
  correo: string;
  esAdmin: boolean;
  fotoPerfil: string;
}

import {Model} from './model';

export interface Tutor extends Model {
  personaId: number;
  usuarioId: number;
  horasAsignadas: number;

  // Relations.
  persona?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  usuario?: {
    id: number;
    correo: string;
  };
}

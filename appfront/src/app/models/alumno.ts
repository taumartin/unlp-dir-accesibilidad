import {Model} from './model';

export interface Alumno extends Model {
  personaId: number;
  legajo: string;
  tieneCertificado: boolean;
  situacion: string;

  // Relations.
  persona?: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

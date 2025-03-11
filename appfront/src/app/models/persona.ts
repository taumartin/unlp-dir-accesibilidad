import {Model} from './model';

export interface Persona extends Model {
  nombre: string;
  apellido: string;
  dni: number;
  telefono: string;
  email: string;
}

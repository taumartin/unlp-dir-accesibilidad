import {Model} from './model';

export interface Evento extends Model {
  fechaYHora: string; // Ej.: "2025-03-12T07:00:25.092Z".
  descripcion: string;

  // Parsed.
  _timestamp?: Date;
  _dateTimeString?: string;
}

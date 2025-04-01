import {Model} from './model';

export interface Reunion extends Model {
  medioComunicacionId: number;
  tutorId: number;
  alumnoId: number;
  materiaId: number | null;
  fechaYHora: string; // Ej.: "2025-03-12T07:00:25.092Z".
  observaciones: string;

  // Relations.
  tutor?: {
    id: number;
    persona: {
      id: number;
      nombre: string;
      apellido: string;
      dni: number;
    };
  };
  alumno?: {
    id: number;
    legajo: string;
    persona: {
      id: number;
      nombre: string;
      apellido: string;
      dni: number;
    };
  };
  materia?: {
    id: number;
    nombre: string;
  };
  medioComunicacion?: {
    id: number;
    nombre: string;
  };

  // Parsed.
  _timestamp?: Date;
  _dateTimeString?: string;
}

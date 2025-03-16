import {Model} from './model';

export interface Apoyo extends Model {
  semestreId: number;
  tutorId: number;
  alumnoId: number;

  // Relations.
  semestre?: {
    id: number;
    anio: number;
    es_primer_semestre: boolean;
  };
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
    }
  };
}

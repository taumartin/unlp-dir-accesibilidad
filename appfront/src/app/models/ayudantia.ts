import {Model} from './model';

export interface Ayudantia extends Model {
  semestreId: number;
  tutorId: number;
  materiaId: number;

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
  materia?: {
    id: number;
    nombre: string;
  };
}

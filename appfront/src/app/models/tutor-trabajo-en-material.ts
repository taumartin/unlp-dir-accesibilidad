import {Model} from './model';

export interface TutorTrabajoEnMaterial extends Model {
  tutorId: number;
  materialAccesibilizadoId: number;
  minutosTrabajados: number;
  fecha: string; // Ej.: "2024-11-03".

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
  materialAccesibilizado?: {
    id: number;
    titulo: string;
    link: string;
  };

  // Parsed.
  _timestamp?: Date;
  _dateString?: string;
}

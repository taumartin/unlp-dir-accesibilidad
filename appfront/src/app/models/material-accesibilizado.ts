import {Model} from './model';

export interface MaterialAccesibilizado extends Model {
  tipoMaterialId: number;
  materiaId: number;
  fechaPublicacion: string; // Ej.: "2024-11-03T00:34:00.000Z",
  titulo: string;
  link: string;

  // Relations.
  materia?: {
    id: number;
    nombre: string;
  };
  tipoMaterial?: {
    id: number;
    nombre: string;
  };

  // Parsed.
  _timestamp?: Date;
  _dateTimeString?: string;
}

export interface DatatablesServersideRequest { // Solo se listan las propiedades usadas.
  draw: number;
  start: number;
  length: number;
  search: {
    value: string;
  };
  order: {
    name: string;
    dir: 'asc' | 'desc';
  }[]
}

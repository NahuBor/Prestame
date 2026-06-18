export interface Objeto {
  _id?: string;
  duenioId?: string;
  titulo: string;
  descripcion?: string;
  categoria: 'herramientas' | 'libros'  | 'otro';
  imagen?: Buffer;
  estado?: 'disponible' | 'prestado';
  fechaCreacion?: string;
}
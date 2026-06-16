export interface Objeto {
  _id?: string;
  duenioId?: string;
  titulo: string;
  descripcion?: string;
  categoria: 'herramientas' | 'libros'  | 'otro';
  estado?: 'disponible' | 'prestado';
  fechaCreacion?: string;
}
export interface Objeto {
  _id?: string;
  duenioId?: string | {  
    _id: string;
    nombre: string;
    email: string;
  };
  titulo: string;
  descripcion?: string;
  categoria: 'herramientas' | 'libros' | 'otro';
  imagen?: string;
  estado?: 'disponible' | 'prestado';
  fechaCreacion?: string;
}
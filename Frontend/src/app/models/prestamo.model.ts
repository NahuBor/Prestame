export interface Prestamo {
  _id?: string;
  objetoId: {
    _id: string;
    titulo: string;
    imagen?: string;
    categoria?: string;
  };
  duenioId: {
    _id: string;
    nombre: string;
    email?: string;
  };
  solicitanteId: {
    _id: string;
    nombre: string;
    email?: string;
  };
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'devuelto';
  tiempo_del_prestamo: '1' | '7' | '30';
  fechaCreacion: Date;
}
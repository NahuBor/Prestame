export interface Prestamo {
  _id?: string;
  objetoId: string;
  duenioId: string;
  solicitanteId: string;   // 👈 NUEVO
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'devuelto';
  fechaCreacion: Date;
  fechaDevolucion?: Date | null;
  tiempo_del_prestamo: '1' | '7' | '30';
}
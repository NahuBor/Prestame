export interface Prestamo {
  _id?: string;               // Opcional porque al crear no existe
  objetoId: string;           // ID del objeto
  duenioId: string;           // ID del dueño (el que presta)
  solicitanteId?: string;     // Te sugiero agregarlo si lo necesitas
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'devuelto';
  fechaCreacion?: Date;       // Lo genera el backend
  fechaDevolucion?: Date | null;
  tiempo_del_prestamo: '1' | '7' | '30'; // días
}
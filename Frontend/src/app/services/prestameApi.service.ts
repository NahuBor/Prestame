import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objeto } from '../models/objeto.interface';
import {User} from '../models/User.model'
import { Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root',
})
export class PrestameApi {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerPerfil() {
    return this.http.get(`${this.apiUrl}/auth/perfil`, { withCredentials: true });
  }
  crearObjeto(objeto: Objeto) {
    return this.http.post<Objeto>(`${this.apiUrl}/objetos`, objeto, { withCredentials: true });
  }
  crearObjetoConImagen(formData: FormData) {
    return this.http.post<Objeto>(`${this.apiUrl}/objetos`, formData, { withCredentials: true });
  }
  editarObjeto(id: string, objeto: Objeto) {
    return this.http.put<Objeto>(`${this.apiUrl}/objetos/${id}`, objeto, { withCredentials: true });
  }
  editarObjetoConImagen(id: string, formData: FormData) {
    return this.http.put<Objeto>(`${this.apiUrl}/objetos/${id}`, formData, { withCredentials: true });
  }
  eliminarObjeto(id: string) {
    return this.http.delete(`${this.apiUrl}/objetos/${id}`, { withCredentials: true });
  }

  obtenerMisObjetos(duenioId: string) {
    return this.http.get<Objeto[]>(`${this.apiUrl}/objetos/duenio/${duenioId}`, { withCredentials: true });
  }
  obtenerObjetoPorId(id: string) {
    return this.http.get<Objeto>(`${this.apiUrl}/objetos/${id}`, { withCredentials: true });
  }

  obtenerObjetosPublicos() {
    return this.http.get<Objeto[]>(`${this.apiUrl}/objetos`, { withCredentials: true });
  }

    obtenerObjetosPorCategoria(categoria: string) {
    return this.http.get<Objeto[]>(`${this.apiUrl}/objetos/categoria/${categoria}`, { withCredentials: true });
  }
  
  crearPrestamo(datos: { objetoId: string, tiempo_del_prestamo: string }): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}/prestamos`, datos, { withCredentials: true });
  }

obtenerPrestamosComoDuenio(duenioId: string): Observable<Prestamo[]> {
  return this.http.get<Prestamo[]>(`${this.apiUrl}/prestamos/duenio/${duenioId}`, { withCredentials: true });
}

// Obtener préstamos donde el usuario es SOLICITANTE (mis solicitudes)
obtenerPrestamosComoSolicitante(solicitanteId: string): Observable<Prestamo[]> {
  return this.http.get<Prestamo[]>(`${this.apiUrl}/prestamos/solicitante/${solicitanteId}`, { withCredentials: true });
}

  // Actualizar estado de un préstamo (aceptar, rechazar, devolver)
  actualizarEstadoPrestamo(id: string, estado: string): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/prestamos/${id}/estado`, { estado }, { withCredentials: true });

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Objeto } from '../models/objeto.interface';

@Injectable({
  providedIn: 'root',
})
export class PrestameApi {
  private apiUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }

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

}


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
  editarObjeto(id: string, objeto: Objeto) {
    return this.http.put<Objeto>(`${this.apiUrl}/objetos/${id}`, objeto, { withCredentials: true });
  }

  eliminarObjeto(id: string) {
    return this.http.delete(`${this.apiUrl}/objetos/${id}`, { withCredentials: true });
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objeto } from '../models/objeto.interface';
import {User} from '../models/User.model'

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

  login(email: string, password: string) : Observable<User> | undefined {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }, { withCredentials: true });
  }

  register(nombre: string, email: string, password: string) : Observable <User> | undefined{
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { nombre, email, password }, { withCredentials: true });
  }

  logout() : Observable<void>{
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true });
  }

  checkSession() : Observable<boolean> | undefined{
    return this.http.post<any>(`${this.apiUrl}/auth/checkSession`, {}, { withCredentials: true });
  }

}


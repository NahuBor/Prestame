import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import {signal} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public actualUser = signal<User | null>(null);
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
   }

  loginService (email: string, password: string) {
    const body = {email, password}
    const respuesta =  this.http.post<User>(`${this.apiUrl}/auth/login`, body, { withCredentials: true });
    console.log("La respuesta del back es: ", respuesta)
    return respuesta
  }

  registerService (nombre: string, apellido: string, email: string, password: string) : Observable <User> | undefined{
    nombre = nombre + apellido;
    return this.http.post<User>(`${this.apiUrl}/auth/register`, { nombre, email, password }, { withCredentials: true });
  }

  logoutService() : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true });
  }

  checkSessionService() : Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/checkSession`,{}, { withCredentials: true });
  }
}
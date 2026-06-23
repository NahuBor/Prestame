import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import {signal} from '@angular/core'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public actualUser = signal<User | null>(null);
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.autoCheckSession()
   }

   private autoCheckSession() {
    this.checkSessionService().subscribe({
      next: (isSessionActive) => {
        if (isSessionActive) {
          const savedUser = localStorage.getItem('user_profile');
          if (savedUser) {
            this.actualUser.set(JSON.parse(savedUser));
          } else {
            this.actualUser.set({ nombre: 'Usuario', email: '' } as User);
          }
        } else {
          this.limpiarSesionLocal();
        }
      },
      error: () => this.limpiarSesionLocal()
    });
  }
  
  private limpiarSesionLocal() {
    localStorage.removeItem('user_profile');
    this.actualUser.set(null);
  }

  loginService (email: string, password: string) {
    const body = {email, password}
    return this.http.post<User>(`${this.apiUrl}/auth/login`, body, { withCredentials: true }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user_profile', JSON.stringify(user));
          this.actualUser.set(user);
        }
      })
    );
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
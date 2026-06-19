import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/User.model';
import { PrestameApi } from './prestameApi.service';

interface ResponseMessage {
  isActive: boolean,
  user: User
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _apiService = inject(PrestameApi)
  private actualUserSubject = new BehaviorSubject<User | null>(null);
  private $actualUser: Observable<User | null> = (this.actualUserSubject.asObservable())

  constructor(private http: HttpClient) { }

  get actualUserValue(): User | null {
    return this.actualUserSubject.value;
  }

  loginService(email: string, password: string) : Observable<User> | undefined {

    const body = { email, password }

    return this._apiService.login(email, password)
  
  }

  registerService(nombre: string, apellido: string, email: string, password: string): Observable<User> | null | undefined {
    nombre = nombre + apellido;
    const body = { nombre, email, password }

    return this._apiService.register(nombre, email, password)
  }

  logoutService(): Observable<void> {
    return this._apiService.logout()
  }

  checkSessionService(): Observable<void> {
    return this._apiService.checkSession()
  }

  }

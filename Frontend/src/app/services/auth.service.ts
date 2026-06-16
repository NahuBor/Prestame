import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/User.model';


interface ResponseMessage {
  isActive: boolean,
  user: User
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl: string = 'http://localhost:3000/api/auth';
  private actualUserSubject = new BehaviorSubject<User | null>(null);
  private $actualUser: Observable<User | null> = (this.actualUserSubject.asObservable())

  constructor(private http: HttpClient) {}

  get actualUserValue(): User | null {
    return this.actualUserSubject.value;
  }



  loginService(email: string, password: string) : Observable<User> | null {
    if (email == '' || password == '') {
      alert('Debe completar todos los campos');
      return null
    }
    if (!email.includes('@')) {
      alert('El email no es válido');
      return null;
    }
    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return null;
    } 

    try {
    const isUserLogged = this.http.post<User>('http://localhost:3000/api/auth/login', { email, password });
    if (isUserLogged.user) {}
    } catch () {
      
    }
  }

registerService(nombre: string, apellido: string, email: string, password: string) : Observable<User> | null | undefined {
  if (nombre == '' || apellido == '' || email == '' || password == '') {
    alert('Debe completar todos los campos');
    return null
  }
  if (!email.includes('@')) {
    alert('El email no es válido');
    return null;
  }
  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return null;
  }
  return this.http.post<User>('http://localhost:3000/api/auth/register', { nombre, apellido, email, password });
}

logoutService() : Observable<any> {
  return this.http.post('http://localhost:3000/api/auth/logout', {});
}


async checkSessionService(): Promise<boolean> {
  try {
    const response = await firstValueFrom(
      this.http.get<ResponseMessage>("http://localhost:3000/api/auth/checkSession", {withCredentials: true})
    )
    return !!response.isActive;
  } catch (error) {
    return false
  }
}
}

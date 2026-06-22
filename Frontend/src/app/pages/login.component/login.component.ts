import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login.component',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  sessionMensaje: string = ''
  isLoading: boolean = false;
  private authService = inject(AuthService)
  private router = inject(Router)


  constructor() {
  }

  validateVoid(): boolean {
    if (this.email == '' || this.password == '') {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(): boolean {
    if (this.email.includes('@')) {
      return true;
    } else {
      return false;
    }
  }

  
validatePassword(): boolean {
    if (this.password.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

irAlRegistro() {
  this.router.navigate(['/register'])
}

  login() {
    this.errorMessage = ''
    if(!this.validateVoid()) {
      this.errorMessage = 'Debe completar todos los campos'
      return;
    }
    if(!this.validateEmail()) {
      this.errorMessage = 'El email no es válido'
      return;
    }

    if(!this.validatePassword()) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres'
      return;
    }

    this.isLoading = true;

    this.authService.loginService(this.email, this.password)?.subscribe(
      {
        next: (res) => {
          console.log(res)
          this.authService.actualUser.set(res)
          this.router.navigate(['/mis-objetos'])
          console.log("hola, funciona")
          console.log(res)
        },
        error: (err) => {
          console.log("el error esta en:", err)
          this.errorMessage = 'Error al iniciar sesión'
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    )
    
    
    this.loading = true;
  }

showSession() {
  console.log("aver")
    const respuestaSession = this.authService.checkSessionService()
    if (respuestaSession) {
      this.sessionMensaje = "Sesión iniciada"
    } else {
      this.sessionMensaje = "Sesión no iniciada"
    }    
  }
}

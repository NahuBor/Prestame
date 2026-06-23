import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login.component',
  imports: [NgClass, ReactiveFormsModule],
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
  private _fb = inject(FormBuilder)
  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  
  constructor() {
  }

irAlRegistro() {
  this.router.navigate(['/register'])
}

showErrors(control: string, validador: string) {
  const campo = this.loginForm.get(control)
  if (!campo) {
    return
  }
  return campo.errors?.[validador] && campo.touched
}


isValid(control: string) {
  const campo = this.loginForm.get(control)
  if (!campo) {
    return false
  }
  return campo.touched && campo.valid
}

isNotValid(control: string) {
  const campo = this.loginForm.get(control)
  if (!campo) {
    return false
  }
  return campo.touched && campo.invalid
}

  login() {
    this.errorMessage = ''
    if(!this.loginForm.valid) {
      this.errorMessage = 'Por favor, verifique los datos ingresados'
      return;
    }
  
    this.isLoading = true;

    const {email, password} = this.loginForm.value
    this.authService.loginService(email!, password!)?.subscribe(
      {
        next: (res) => {
          this.authService.actualUser.set(res)
          this.router.navigate(['/mis-objetos'])
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


}

import { Component } from '@angular/core';
import { inject } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-register.component',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  private authService = inject(AuthService)
  private router = inject(Router)
  isLoading = false;
  errorMessage = '';

  validateVoid(): boolean {
    if (this.nombre == '' || this.apellido == '' || this.email == '' || this.password == '') {
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

  validateSamePassword(): boolean {
    if (this.password == this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

// formRegister = new FormGroup({
//   nombre: new FormControl('', [Validators.required]),
//   apellido: new FormControl('', [Validators.required]),
//   email: new FormControl('', [Validators.required, Validators.email]),
//   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
//   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
// })



  register() {
    console.log(this.email)
    this.errorMessage = ''
    if (!this.validateVoid) {
      this.errorMessage = 'Debe completar todos los campos'
      return;
    }
    if (!this.validateEmail()) {
      this.errorMessage = 'El email no es válido'
      return;
    }
    if (!this.validatePassword()) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres'
      return;
    }

    if (!this.validateSamePassword()) {
      this.errorMessage = 'Las contraseñas no coinciden'
      return;
    }

    this.isLoading = true;

    this.authService.registerService(this.nombre, this.apellido, this.email, this.password)?.subscribe(
      {
        next: (res) => {
          console.log(res)
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.log(err)
          this.errorMessage = 'Error al registrarse'
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    )
  }
}




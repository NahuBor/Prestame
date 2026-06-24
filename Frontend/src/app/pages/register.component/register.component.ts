import { Component } from '@angular/core';
import { inject } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [NgClass, ReactiveFormsModule],
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
  private _fb = inject(FormBuilder)
  private router = inject(Router)
  isLoading = false;
  errorMessage = '';
  public registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  showErrors(control: string, validador: string): boolean {
    const campo = this.registerForm.get(control);
    if (!campo) return false;
    return campo.errors?.[validador] === true && campo.touched === true;
  }

  isValid(control: string): boolean {
    const campo = this.registerForm.get(control);
    if (!campo) return false;
    if (control === 'confirmPassword' && this.passwordsDoNotMatch) return false;
    return campo.touched === true && campo.valid === true;
  }

  isNotValid(control: string): boolean {
    const campo = this.registerForm.get(control);
    if (!campo) return false;
    if (control === 'confirmPassword' && this.passwordsDoNotMatch) return true;
    return campo.touched === true && campo.invalid === true;
  }



  get passwordsDoNotMatch(): boolean {
    const pass = this.registerForm.get('password')?.value ?? '';
    const confirmPass = this.registerForm.get('confirmPassword')?.value ?? '';
    const confirmTouched = this.registerForm.get('confirmPassword')?.touched ?? false;
    
    return confirmTouched && pass !== confirmPass;
  }
  register() {
    this.errorMessage = '';

    if (this.passwordsDoNotMatch) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.registerForm.valid) {
      this.errorMessage = 'Por favor, verifique los datos ingresados';
      return;
    }

    this.isLoading = true;

    const { nombre, apellido, email, password } = this.registerForm.value;

    this.authService.registerService(
      nombre ?? '', 
      apellido ?? '', 
      email ?? '', 
      password ?? ''
    )?.subscribe(
      {
        next: (res) => {

          this.router.navigate(['/login'])
        },
        error: (err) => {

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




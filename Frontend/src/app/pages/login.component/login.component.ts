import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-login.component',
  imports: [FormBuilder],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  loading: boolean = false;


  constructor(private authService: AuthService) {}

  login() {
    if (!this.email && !this.password) {
       alert("Campios vacios, completelos")
       return 
    }
    this.loading = true;
    return this.authService.loginService(this.email, this.password)
  }
}

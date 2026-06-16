import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login.component/login.component').then(m => m.LoginComponent) },
  {path: 'register', loadComponent: () => import('./pages/register.component/register.component').then(m => m.RegisterComponent)},
  {
    path: 'user', 
    loadComponent: () => import('./pages/user.component/user.component').then((m) => m.UserComponent),
    canActivate: [authGuard]
  }
];



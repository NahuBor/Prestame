import { Routes } from '@angular/router';
import { MisObjetos } from './pages/mis-objetos/mis-objetos';
import { ObjetoForm } from './pages/objeto-form/objeto-form';
import { ObjetosFeedComponent } from './components/objetos-feed/objetos-feed';
import { LoginComponent } from './pages/login.component/login.component';
import { RegisterComponent } from './pages/register.component/register.component';
import { ObjetoDetalle } from './components/objeto-detalle/objeto-detalle'; 
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { Prestamos } from './pages/prestamo/prestamo';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard]},
    { path: 'objetos', component: ObjetosFeedComponent },
    { path: 'mis-objetos', component: MisObjetos, canActivate: [authGuard] },
    { path: 'objeto-form', component: ObjetoForm, canActivate: [authGuard] },
    { path: 'objeto-detalle/:id', component: ObjetoDetalle, canActivate: [authGuard] },
    { path: 'objeto-form/:id', component: ObjetoForm, canActivate: [authGuard] },
    { path: 'prestamo', component: Prestamos, canActivate: [authGuard]},
    
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
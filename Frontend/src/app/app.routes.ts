import { Routes } from '@angular/router';
import { MisObjetos } from './pages/mis-objetos/mis-objetos';
import { ObjetoForm } from './pages/objeto-form/objeto-form';
import { ObjetosFeedComponent } from './components/objetos-feed/objetos-feed';
import { LoginComponent } from './pages/login.component/login.component';
import { RegisterComponent } from './pages/register.component/register.component';
import { ObjetoDetalle } from './components/objeto-detalle/objeto-detalle'; 
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'objetos', component: ObjetosFeedComponent },
    { path: 'mis-objetos', component: MisObjetos },
    { path: 'objeto-form', component: ObjetoForm },
    { path: 'objeto-detalle/:id', component: ObjetoDetalle },
    { path: 'objeto-form/:id', component: ObjetoForm },
    { path: '', redirectTo: 'mis-objetos', pathMatch: 'full' }  // ← Ruta raíz
];
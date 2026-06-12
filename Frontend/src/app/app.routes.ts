import { Routes } from '@angular/router';
import { MisObjetos } from './mis-objetos/mis-objetos';
import { ObjetoForm } from './objeto-form/objeto-form';


export const routes: Routes = [
    { path: 'mis-objetos', component: MisObjetos },
    { path: 'objeto-form', component: ObjetoForm },
    { path: 'objeto-form/:id', component: ObjetoForm },
    { path: '', redirectTo: 'mis-objetos', pathMatch: 'full' }
];

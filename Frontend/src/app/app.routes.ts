import { Routes } from '@angular/router';
import { MisObjetos } from './components/mis-objetos/mis-objetos';
import { ObjetoForm } from './components/objeto-form/objeto-form';
import { ObjetosFeedComponent } from './components/objetos-feed/objetos-feed';


export const routes: Routes = [

    { path: 'objetos', component: ObjetosFeedComponent },
    { path: 'mis-objetos', component: MisObjetos },
    { path: 'objeto-form', component: ObjetoForm },
    { path: 'objeto-form/:id', component: ObjetoForm },
    { path: '', redirectTo: 'mis-objetos', pathMatch: 'full' }
];

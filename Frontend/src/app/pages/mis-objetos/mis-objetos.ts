import { Component,OnInit, ChangeDetectorRef  } from '@angular/core';
import { PrestameApi } from '../../services/prestameApi.service';
import { Objeto } from '../../models/objeto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mis-objetos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-objetos.html',
  styleUrl: './mis-objetos.css',
})
export class MisObjetos implements OnInit {

  objetos: Objeto[] = [];

  constructor(
    private prestameApi: PrestameApi,
    private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.cargarObjetos();
  }

  async cargarObjetos() {
    try {
        //const perfil = await firstValueFrom(this.prestameApi.obtenerPerfil());
        //const duenioId = (perfil as any)._id;
        //const data = await firstValueFrom(this.prestameApi.obtenerMisObjetos(duenioId));
        const duenioId = '6a2b1de016a755a64aed94c1'; // TEMPORAL - reemplazar con obtenerPerfil()
        const data = await firstValueFrom(this.prestameApi.obtenerMisObjetos(duenioId));
        this.objetos = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
    } catch (err) {
        console.log('Error al cargar objetos', err);
    }
}

  eliminarObjeto(id: string) {
    this.prestameApi.eliminarObjeto(id).subscribe({
      next: () => {
        this.objetos = this.objetos.filter(o => o._id !== id);
        alert('Objeto eliminado correctamente');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error al eliminar', err)
        alert('Error al eliminar el objeto');
      }
    });
  }

}
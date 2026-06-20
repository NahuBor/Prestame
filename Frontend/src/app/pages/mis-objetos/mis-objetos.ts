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
    console.log('🔍 cargarObjetos - INICIO');
    try {
        const perfil = await firstValueFrom(this.prestameApi.obtenerPerfil());
        console.log('✅ Perfil obtenido:', perfil);
      
        const duenioId = (perfil as any)._id;
        console.log('🔑 duenioId:', duenioId);
        const data = await firstValueFrom(this.prestameApi.obtenerMisObjetos(duenioId));
              console.log('📦 Datos recibidos:', data);
      
       
        this.objetos = Array.isArray(data) ? data : [];
         console.log(`✅ ${this.objetos.length} objetos cargados`);
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
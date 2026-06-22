import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PrestameApi } from '../../services/prestameApi.service';
import { Objeto } from '../../models/objeto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-objetos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-objetos.html',
  styleUrl: './mis-objetos.css',
})
export class MisObjetos implements OnInit {

  objetos: Objeto[] = [];
  cargando: boolean = false;

  constructor(
    private prestameApi: PrestameApi,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cargarObjetos();
  }

  cargarObjetos() {
    this.cargando = true;
    this.prestameApi.obtenerPerfil().subscribe({
      next: (perfil: any) => {
        console.log('Perfil obtenido:', perfil);
        const duenioId = perfil._id;
        this.prestameApi.obtenerMisObjetos(duenioId).subscribe({
          next: (data: any) => {
            this.objetos = Array.isArray(data) ? data : [];
            this.cargando = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log('Error al cargar objetos', err);
            this.cargando = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.log('Error al cargar objetos', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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
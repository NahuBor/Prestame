import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PrestameApi } from '../../services/prestameApi.service';
import { Objeto } from '../../models/objeto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { perfil_usuario } from '../../models/perfil_usuario.model';
@Component({
  selector: 'app-mis-objetos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-objetos.html',
  styleUrl: './mis-objetos.css',
})
export class MisObjetos implements OnInit {

  objetos: Objeto[] = [];
  cargando: boolean = false;
  perfil: perfil_usuario={
    _id:'',
    nombre: '',
    email: ''
  };

  constructor(
    private prestameApi: PrestameApi,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.cargarObjetos();
  }
onRowClick(objeto: Objeto) {
  this.router.navigate(['/objeto-detalle', objeto._id], { 
    state: { 
      objeto: objeto,
      desde: 'mis-objetos' 
    } 
  });
}
  cargarObjetos() {
    this.cargando = true;
    this.prestameApi.obtenerPerfil(this.perfil).subscribe({
      next: (perfil) => {
        console.log('Perfil obtenido:', perfil);
        const duenioId = perfil._id;
        this.prestameApi.obtenerMisObjetos(duenioId).subscribe({
          next: (data) => {
            this.objetos = Array.isArray(data) ? data : [];
            this.cargando = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log('Error al cargar objetos');
            this.cargando = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.log('Error al cargar objetos');
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
        console.log('Error al eliminar');
        alert('Error al eliminar el objeto');
      }
    });
  }

}
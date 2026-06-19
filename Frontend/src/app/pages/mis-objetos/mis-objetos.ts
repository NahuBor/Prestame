import { Component,OnInit, ChangeDetectorRef  } from '@angular/core';
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

  constructor(
    private prestameApi: PrestameApi,
    private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.cargarObjetos();
  }

  cargarObjetos() {
    const duenioIdHardcodeado = '6a2b1de016a755a64aed94c1'; // TEMPORAL - reemplazar cuando exista "el auth"

    this.prestameApi.obtenerMisObjetos(duenioIdHardcodeado).subscribe({
      next: (data) => {
        console.log('datos recibidos:', data);
        this.objetos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error al cargar objetos', err);
      }
    });
}

  eliminarObjeto(id: string) {
    this.prestameApi.eliminarObjeto(id).subscribe({
      next: () => {
        this.objetos = this.objetos.filter(o => o._id !== id);
        alert('Objeto eliminado correctamente');
      },
      error: (err) => {
        console.log('Error al eliminar', err)
        alert('Error al eliminar el objeto');
      }
    });
  }

}
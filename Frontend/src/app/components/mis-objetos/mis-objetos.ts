import { Component,OnInit } from '@angular/core';
import { PrestameApi } from '../../prestame-api';
import { Objeto } from '../../interfaces/objeto.interface';
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

  constructor(private prestameApi: PrestameApi) {}

  ngOnInit() {
    this.cargarObjetos();
  }

  cargarObjetos() {
    
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
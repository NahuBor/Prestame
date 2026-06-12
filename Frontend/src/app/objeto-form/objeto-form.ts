import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestameApi } from '../prestame-api';
import { Objeto } from '../interfaces/objeto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objeto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './objeto-form.html',
  styleUrl: './objeto-form.css',
})
export class ObjetoForm implements OnInit {

  objeto: Objeto = {
    titulo: '',
    descripcion: '',
    categoria: 'herramientas'
  };

  esEdicion: boolean = false;
  objetoId: string | null = null;

  constructor(
    private prestameApi: PrestameApi,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.objetoId = this.route.snapshot.paramMap.get('id');
    if (this.objetoId) {
      this.esEdicion = true;
    }
  }

  guardar() {
    if (this.esEdicion && this.objetoId) {
      this.prestameApi.editarObjeto(this.objetoId, this.objeto).subscribe({
        next: () => this.router.navigate(['/mis-objetos']),
        error: (err) => console.log('Error al editar', err)
      });
    } else {
      this.prestameApi.crearObjeto(this.objeto).subscribe({
        next: () => this.router.navigate(['/mis-objetos']),
        error: (err) => console.log('Error al crear', err)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/mis-objetos']);
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestameApi } from '../../prestame-api';
import { Objeto } from '../../interfaces/objeto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objeto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './objeto-form.html',
  styleUrl: './objeto-form.css',
})
export class ObjetoForm implements OnInit {
  imagenSeleccionada: File | null = null;
  esEdicion: boolean = false;
  cargando: boolean = false;
  objetoId: string | null = null;
  objeto: Objeto = {
    titulo: '',
    descripcion: '',
    categoria: 'herramientas'
  };

  constructor(
    private prestameApi: PrestameApi,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.objetoId = this.route.snapshot.paramMap.get('id');
    if (this.objetoId) {
      this.esEdicion = true;
      this.cargando = true;
      try {
        const data = await this.prestameApi.obtenerObjetoPorId(this.objetoId).toPromise();
        this.objeto = Array.isArray(data) ? data[0] : data as Objeto;
        this.cargando = false;
        this.cdr.detectChanges();
      } catch (err) {
        console.log('Error al cargar objeto', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
    }
  }

  guardar() {
    let formData: FormData | null = null;
    if (this.imagenSeleccionada) {
      formData = new FormData();
      formData.append('titulo', this.objeto.titulo);
      formData.append('categoria', this.objeto.categoria);
      formData.append('descripcion', this.objeto.descripcion || '');
      formData.append('imagen', this.imagenSeleccionada);
    }
    if (this.esEdicion && this.objetoId) {
      const peticion = formData
        ? this.prestameApi.editarObjetoConImagen(this.objetoId, formData)
        : this.prestameApi.editarObjeto(this.objetoId, this.objeto);
      peticion.subscribe({
        next: () => {
          alert('Objeto editado correctamente');
          this.router.navigate(['/mis-objetos']);
        },
        error: (err) => {
          alert('Error al editar el objeto');
          console.log('Error al editar', err);
        }
      });
    } else {
      const peticion = formData
        ? this.prestameApi.crearObjetoConImagen(formData)
        : this.prestameApi.crearObjeto(this.objeto);
      peticion.subscribe({
        next: () => {
          alert('Objeto publicado correctamente');
          this.router.navigate(['/mis-objetos']);
        },
        error: (err) => {
          alert('Error al crear el objeto');
          console.log('Error al crear', err);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/mis-objetos']);
  }
}
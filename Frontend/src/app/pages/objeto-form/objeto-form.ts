import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestameApi } from '../../services/prestameApi.service';
import { Objeto } from '../../models/objeto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { perfil_usuario } from '../../models/perfil_usuario.model';

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
  duenioId: string = '';

  objeto: Objeto = {
    titulo: '',
    descripcion: '',
    categoria: 'herramientas',
    duenioId: ''
  };

  perfil: perfil_usuario = {
    _id: '',
    nombre: '',
    email: ''
  };

  constructor(
    private prestameApi: PrestameApi,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.prestameApi.obtenerPerfil(this.perfil).subscribe({
      next: (perfil) => {
        this.duenioId = perfil._id;
        this.objeto.duenioId = this.duenioId;

        this.objetoId = this.route.snapshot.paramMap.get('id');
        if (this.objetoId) {
          this.esEdicion = true;
          this.cargando = true;

          this.prestameApi.obtenerObjetoPorId(this.objetoId).subscribe({
            next: (data) => {
              this.objeto = data as Objeto;
              this.cargando = false;
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.log('Error al cargar objeto');
              this.cargando = false;
              this.cdr.detectChanges();
            }
          });
        }
      },
      error: (error) => {
        alert('Error al identificar al usuario');
        this.router.navigate(['/login']);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
    }
  }

  // 🔥 Función auxiliar para obtener el ID del dueño como string
  private obtenerIdDuenioString(): string {
    const duenio = this.objeto.duenioId;
    if (!duenio) return '';
    if (typeof duenio === 'object' && duenio !== null) {
      // Si es objeto, extraer _id
      return (duenio as any)._id || String(duenio);
    }
    return duenio as string;
  }

  guardar() {
    const duenioIdStr = this.obtenerIdDuenioString();
    if (!duenioIdStr) {
      alert('Error: No se pudo identificar al usuario');
      console.error('duenioId es undefined');
      return;
    }

    // Preparar el objeto para enviar (con duenioId como string)
    const objetoParaEnviar = {
      ...this.objeto,
      duenioId: duenioIdStr
    };

    let formData: FormData | null = null;
    if (this.imagenSeleccionada) {
      formData = new FormData();
      formData.append('titulo', this.objeto.titulo);
      formData.append('categoria', this.objeto.categoria);
      formData.append('descripcion', this.objeto.descripcion || '');
      formData.append('imagen', this.imagenSeleccionada);
      formData.append('duenioId', duenioIdStr); // 👈 Ahora es string
    }

    if (this.esEdicion && this.objetoId) {
      const peticion = formData
        ? this.prestameApi.editarObjetoConImagen(this.objetoId, formData)
        : this.prestameApi.editarObjeto(this.objetoId, objetoParaEnviar); // 👈 Usamos objeto con duenioId string
      peticion.subscribe({
        next: () => {
          alert('Objeto editado correctamente');
          this.router.navigate(['/mis-objetos']);
        },
        error: (err) => {
          alert('Error al editar el objeto');
          console.log('Error al editar');
        }
      });
    } else {
      const peticion = formData
        ? this.prestameApi.crearObjetoConImagen(formData)
        : this.prestameApi.crearObjeto(objetoParaEnviar); // 👈 Usamos objeto con duenioId string
      peticion.subscribe({
        next: () => {
          alert('Objeto publicado correctamente');
          this.router.navigate(['/mis-objetos']);
        },
        error: (err) => {
          alert('Error al crear el objeto');
          console.log('Error al crear');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/mis-objetos']);
  }
}
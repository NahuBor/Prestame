import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrestameApi } from '../../services/prestameApi.service';
import { AuthService } from '../../services/auth.service';
import { Objeto } from '../../models/objeto.interface';
import { perfil_usuario } from '../../models/perfil_usuario.model'
import { timeout } from 'rxjs';

@Component({
  selector: 'app-objeto-detalle',
  imports: [CommonModule],
  templateUrl: './objeto-detalle.html',
  styleUrl: './objeto-detalle.css',
})
export class ObjetoDetalle implements OnInit {
  objeto: Objeto | null = null;
  cargando = true;
  error = '';
  esPropio = false;
  desdeMisObjetos = false;

  duenioNombre: string = '';
  duenioEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private prestameApi: PrestameApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    
  }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { objeto: Objeto; desde?: string };
    
    if (state?.objeto) {
      this.objeto = state.objeto;
      this.desdeMisObjetos = state.desde === 'mis-objetos';
      this.cargando = false;
      this.verificarPropiedad();
      this.cargarDuenio(this.objeto.duenioId);
      this.cdr.detectChanges();
      return;
    }
    this.cargarObjeto();
  }

  cargarObjeto() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'ID no válido';
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }
    this.prestameApi.obtenerObjetoPorId(id)
      .pipe(timeout(10000))
      .subscribe({
        next: (data: Objeto) => {
          this.objeto = data;
          this.cargando = false;
          this.verificarPropiedad();
          
          if (this.objeto?.duenioId) {
            this.cargarDuenio(this.objeto.duenioId);
          } else {
            this.duenioNombre = 'Sin dueño';
            this.duenioEmail = '';
          }
          
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          this.error = err.name === 'TimeoutError'
            ? 'Tiempo de espera agotado'
            : 'Error al cargar';
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
  }

  cargarDuenio(duenioId: string | any) {
    if (typeof duenioId === 'object') {
    }
    
    const id = typeof duenioId === 'object' ? duenioId?._id : duenioId;
    if (!id) {
      this.duenioNombre = 'Usuario desconocido';
      this.duenioEmail = '';
      this.cdr.detectChanges();
      return;
    }

    this.prestameApi.obtenerUsuarioPorId(id).subscribe({
      next: (usuario: perfil_usuario) => {
        this.duenioNombre = usuario.nombre;
        this.duenioEmail = usuario.email;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.duenioNombre = 'Usuario desconocido';
        this.duenioEmail = '';
        this.cdr.detectChanges();
      }
    });
  }

  private verificarPropiedad() {
    if (!this.objeto) {
      this.esPropio = false;
      return;
    }
    const usuario = this.authService.actualUser();
    if (!usuario) {
      this.esPropio = false;
      return;
    }
    const idDuenio = this.objeto.duenioId;
    const idUsuario = (usuario as any)._id;
    this.esPropio = idDuenio === idUsuario;
  }

  volver() {
    if (this.desdeMisObjetos) {
      this.router.navigate(['/mis-objetos']);
    } else {
      this.router.navigate(['/objetos']);
    }
  }

  editar() {
    if (this.objeto?._id) {
      this.router.navigate(['/objeto-form', this.objeto._id]);
    }
  }

  solicitarObjeto(objetoId: string) {
    const dias = prompt('¿Cuántos días necesitas el préstamo? (1, 7 o 30)', '7');
    if (!dias || !['1','7','30'].includes(dias)) {
      alert('Por favor, elige 1, 7 o 30 días.');
      return;
    }
    this.prestameApi.crearPrestamo({ objetoId, tiempo_del_prestamo: dias }).subscribe({
      next: (resp) => {
        alert('Solicitud enviada correctamente');
      },
      error: (err) => {
        alert('Error al enviar la solicitud: ' + err.message);
      }
    });
  }

  eliminarObjeto() {
    if (!this.objeto?._id) {
      alert('No se puede eliminar este objeto');
      return;
    }
    if (confirm('¿Seguro que quieres eliminar este objeto?')) {
      this.prestameApi.eliminarObjeto(this.objeto._id).subscribe({
        next: () => {
          alert('Objeto eliminado correctamente');
          this.router.navigate(['/mis-objetos']);
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('Error al eliminar el objeto');
        }
      });
    }
  }
}
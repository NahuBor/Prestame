import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrestameApi } from '../../services/prestameApi.service';
import { AuthService } from '../../services/auth.service';
import { Objeto } from '../../models/objeto.interface';
import { firstValueFrom, timeout } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private prestameApi: PrestameApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { objeto: Objeto; desde?: string };
    if (state?.objeto) {
      this.objeto = state.objeto;
      this.desdeMisObjetos = state.desde === 'mis-objetos';
      this.cargando = false;
      this.verificarPropiedad();
      this.cdr.detectChanges();
      return;
    }
    await this.cargarObjeto();
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
        this.cdr.detectChanges();
      },
      error: (err: Error) => {    // 👈 tipamos el error (sin any)
        this.error = err.name === 'TimeoutError'
          ? 'Tiempo de espera agotado'
          : 'Error al cargar';
        this.cargando = false;
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
    // Usamos duenioId (campo que viene del backend)
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

  solicitarObjeto() {
    // TODO: implementar cuando tengas el servicio de préstamos
    alert('Función de solicitar pendiente');
  }

  // ✅ Método eliminar (igual que en MisObjetos)
  eliminarObjeto() {
    if (!this.objeto?._id) {
      alert('No se puede eliminar este objeto');
      return;
    }
    if (confirm('¿Seguro que quieres eliminar este objeto?')) {
      this.prestameApi.eliminarObjeto(this.objeto._id).subscribe({
        next: () => {
          alert('Objeto eliminado correctamente');
          // Redirige siempre a "mis objetos" (donde está la lista del usuario)
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
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrestameApi } from '../../services/prestameApi.service';
import { AuthService } from '../../services/auth.service';
import { Objeto } from '../../models/objeto.interface';
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
          console.log('📦 Objeto recibido:', data);
          console.log('👤 Dueño:', data.duenioId);
          this.objeto = data;
          this.cargando = false;
          this.verificarPropiedad();
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
    
    const idUsuario = (usuario as any)._id;
    
    // 🔥 Verificar si duenioId es un objeto o string
    let idDuenio: string;
    if (this.objeto.duenioId && typeof this.objeto.duenioId === 'object') {
      idDuenio = (this.objeto.duenioId as any)._id;
    } else {
      idDuenio = this.objeto.duenioId as string;
    }
    
    this.esPropio = idDuenio === idUsuario;
    console.log('🔍 ¿Es propio?', this.esPropio);
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
        alert('✅ Solicitud enviada correctamente');
      },
      error: (err) => {
        alert('❌ Error al enviar la solicitud: ' + err.message);
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

  // 🔥 Método para obtener el nombre del dueño
  getNombreDuenio(): string {
    if (!this.objeto?.duenioId) return 'Desconocido';
    if (typeof this.objeto.duenioId === 'object' && this.objeto.duenioId !== null) {
      return (this.objeto.duenioId as any).nombre || 'Desconocido';
    }
    return 'Desconocido';
  }

  // 🔥 Método para obtener el email del dueño
  getEmailDuenio(): string | null {
    if (!this.objeto?.duenioId) return null;
    if (typeof this.objeto.duenioId === 'object' && this.objeto.duenioId !== null) {
      return (this.objeto.duenioId as any).email || null;
    }
    return null;
  }
}
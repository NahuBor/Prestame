import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestameApi } from '../../services/prestameApi.service';
import { AuthService } from '../../services/auth.service';
import { Prestamo } from '../../models/prestamo.model';
import { perfil_usuario } from '../../models/perfil_usuario.model';



@Component({
  selector: 'app-mis-prestamos',
  imports: [CommonModule],
  templateUrl: './prestamo.html',
  styleUrls: ['./prestamo.css']
})
export class Prestamos implements OnInit {
  prestamosComoDuenio: Prestamo[] = [];
  prestamosComoSolicitante: Prestamo[] = [];
  cargando = true;
  error = '';
  private peticionesCompletadas = 0;

 
get solicitudesPendientesComoDuenio(): Prestamo[] {
    return this.prestamosComoDuenio.filter(p => p.estado === 'pendiente');
  }

  get prestamosAceptadosComoDuenio(): Prestamo[] {
    return this.prestamosComoDuenio.filter(p => p.estado === 'aceptado' || p.estado === 'devuelto');
  }

  

  constructor(
    private prestameApi: PrestameApi,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    const usuario = this.authService.actualUser();
    if (!usuario) {
      this.error = 'Usuario no autenticado';
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }
    const userId = (usuario as any)._id;

    this.peticionesCompletadas = 0;
    this.prestamosComoDuenio = [];
    this.prestamosComoSolicitante = [];
    this.cargando = true;
    this.error = '';

   
    this.prestameApi.obtenerPrestamosComoDuenio(userId).subscribe({
      next: (data) => {
        this.prestamosComoDuenio = Array.isArray(data) ? data : [];
        this.peticionesCompletadas++;
        this.verificarCarga();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar préstamos como dueño';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });

    this.prestameApi.obtenerPrestamosComoSolicitante(userId).subscribe({
      next: (data) => {
        this.prestamosComoSolicitante = Array.isArray(data) ? data : [];
        this.peticionesCompletadas++;
        this.verificarCarga();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar préstamos como solicitante';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  private verificarCarga() {
    if (this.peticionesCompletadas === 2) {
      this.cargando = false;
    }
  }


  aceptarSolicitud(prestamo: Prestamo) {
    if (prestamo.estado !== 'pendiente') return;
    this.prestameApi.actualizarEstadoPrestamo(prestamo._id!, 'aceptado').subscribe({
      next: (actualizado) => {
        const index = this.prestamosComoDuenio.findIndex(p => p._id === prestamo._id);
        if (index !== -1) {
          this.prestamosComoDuenio[index] = actualizado;
        }
        this.cdr.detectChanges();
        alert('Solicitud aceptada');
        // Recargar para actualizar todas las listas
        this.cargarPrestamos();
      },
      error: (err) => {
        console.error('Error al aceptar:', err);
        alert('Error al aceptar la solicitud');
      }
    });
  }

 
  rechazarSolicitud(prestamo: Prestamo) {
    if (prestamo.estado !== 'pendiente') return;
    this.prestameApi.actualizarEstadoPrestamo(prestamo._id!, 'rechazado').subscribe({
      next: (actualizado) => {
        const index = this.prestamosComoDuenio.findIndex(p => p._id === prestamo._id);
        if (index !== -1) {
          this.prestamosComoDuenio[index] = actualizado;
        }
        this.cdr.detectChanges();
        alert('Solicitud rechazada');
        this.cargarPrestamos();
      },
      error: (err) => {
        console.error('Error al rechazar:', err);
        alert('Error al rechazar la solicitud');
      }
    });
  }

}
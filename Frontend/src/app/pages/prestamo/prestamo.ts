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

  // ✅ Propiedades computadas para filtrar
  get solicitudesPendientesComoDuenio(): Prestamo[] {
    return this.prestamosComoDuenio.filter(p => p.estado === 'pendiente');
  }

  get prestamosAceptadosComoDuenio(): Prestamo[] {
    // Incluir 'aceptado' y 'pendiente_devolucion' como activos
    return this.prestamosComoDuenio.filter(p => 
      p.estado === 'aceptado' || p.estado === 'pendiente_devolucion'
    );
  }

  get prestamosActivosComoSolicitante(): Prestamo[] {
    // Para el solicitante, los activos son los aceptados o en proceso de devolución
    return this.prestamosComoSolicitante.filter(p => 
      p.estado === 'aceptado' || p.estado === 'pendiente_devolucion'
    );
  }

  get prestamosCompletados(): Prestamo[] {
    // Historial: devueltos y rechazados
    return [
      ...this.prestamosComoDuenio.filter(p => p.estado === 'devuelto' || p.estado === 'rechazado'),
      ...this.prestamosComoSolicitante.filter(p => p.estado === 'devuelto' || p.estado === 'rechazado')
    ];
  }

  get historialComoDuenio(): Prestamo[] {
    // Historial como dueño: devueltos y rechazados
    return this.prestamosComoDuenio.filter(p => 
      p.estado === 'devuelto' || p.estado === 'rechazado'
    );
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

    // 1. Préstamos donde es dueño
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

    // 2. Préstamos donde es solicitante
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

  // ✅ Aceptar solicitud
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

  // ✅ Rechazar solicitud
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

  // ✅ NUEVO: Solicitar devolución (desde el lado del solicitante)
  solicitarDevolucion(prestamo: Prestamo) {
    // Usamos type assertion para evitar el error de TypeScript
    if ((prestamo.estado as string) !== 'aceptado') {
      alert('Este préstamo no está activo');
      return;
    }
    
    if (!confirm('¿Estás seguro de que quieres devolver este objeto?')) {
      return;
    }

    this.prestameApi.solicitarDevolucion(prestamo._id!).subscribe({
      next: (actualizado) => {
        // Actualizar en la lista de solicitante
        const index = this.prestamosComoSolicitante.findIndex(p => p._id === prestamo._id);
        if (index !== -1) {
          this.prestamosComoSolicitante[index] = actualizado;
        }
        // También actualizar en la lista del dueño si existe
        const indexDuenio = this.prestamosComoDuenio.findIndex(p => p._id === prestamo._id);
        if (indexDuenio !== -1) {
          this.prestamosComoDuenio[indexDuenio] = actualizado;
        }
        this.cdr.detectChanges();
        alert('✅ Solicitud de devolución enviada. Espera confirmación del dueño.');
        // Recargar para actualizar todas las listas
        this.cargarPrestamos();
      },
      error: (err) => {
        console.error('Error al solicitar devolución:', err);
        alert(err.error?.message || 'Error al solicitar la devolución');
      }
    });
  }

  // ✅ NUEVO: Confirmar devolución (desde el lado del dueño)
  confirmarDevolucion(prestamo: Prestamo) {
    if ((prestamo.estado as string) !== 'pendiente_devolucion') {
      alert('No hay una devolución pendiente');
      return;
    }

    if (!confirm('¿Has recibido el objeto de vuelta?')) {
      return;
    }

    this.prestameApi.confirmarDevolucion(prestamo._id!).subscribe({
      next: (actualizado) => {
        const index = this.prestamosComoDuenio.findIndex(p => p._id === prestamo._id);
        if (index !== -1) {
          this.prestamosComoDuenio[index] = actualizado;
        }
        // También actualizar en la lista de solicitante si existe
        const indexSolicitante = this.prestamosComoSolicitante.findIndex(p => p._id === prestamo._id);
        if (indexSolicitante !== -1) {
          this.prestamosComoSolicitante[indexSolicitante] = actualizado;
        }
        this.cdr.detectChanges();
        alert('✅ Devolución confirmada. El objeto vuelve a estar disponible.');
        this.cargarPrestamos();
      },
      error: (err) => {
        console.error('Error al confirmar devolución:', err);
        alert(err.error?.message || 'Error al confirmar la devolución');
      }
    });
  }

  verObjeto(objetoId: string) {
    // Navegar al detalle del objeto (opcional)
    // this.router.navigate(['/objeto-detalle', objetoId]);
  }
}
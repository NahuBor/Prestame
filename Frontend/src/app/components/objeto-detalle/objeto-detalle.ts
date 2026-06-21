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
  esPropio = false;           // para saber si es del usuario
  desdeMisObjetos = false;    // 👈 flag para saber si vienes de "mis objetos"

  constructor(
    private route: ActivatedRoute,
    private prestameApi: PrestameApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { objeto: Objeto, desde?: string };
    if (state?.objeto) {
      this.objeto = state.objeto;
      this.desdeMisObjetos = state.desde === 'mis-objetos'; // 👈 leer flag
      this.cargando = false;
      this.verificarPropiedad();
      this.cdr.detectChanges();
      return;
    }
    await this.cargarObjeto();
  }

  async cargarObjeto() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        this.error = 'ID no válido';
        this.cargando = false;
        this.cdr.detectChanges();
        return;
      }
      const data = await firstValueFrom(
        this.prestameApi.obtenerObjetoPorId(id).pipe(timeout(10000))
      );
      this.objeto = data;
      this.cargando = false;
      // Después de cargar, también podemos verificar si venimos de mis-objetos
      // (no lo sabemos desde el estado, pero podemos usar la URL o un servicio)
      // En este caso, si no hay estado, asumimos que vienes del feed general
      this.verificarPropiedad();
      this.cdr.detectChanges();
    } catch (err: any) {
      this.error = err.name === 'TimeoutError' ? 'Tiempo de espera agotado' : 'Error al cargar';
      this.cargando = false;
      this.cdr.detectChanges();
    }
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
    // Usamos duenioId (que tienes en el objeto)
    const idDuenio = this.objeto.duenioId;  // 👈 campo que se ve en tu HTML
    const idUsuario = (usuario as any)._id;
    this.esPropio = idDuenio === idUsuario;
  }

  volver() {
    // Si venías de "mis objetos", vuelve allí; si no, a la lista general
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

  eliminarObjeto() {
    // TODO: implementar
    alert('Función de eliminar pendiente');
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrestameApi } from '../../services/prestameApi.service';
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
  cargando: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private prestameApi: PrestameApi,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  async ngOnInit() {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { objeto: Objeto };
    if (state?.objeto) {
      console.log('Objeto recuperado del estado');
      this.objeto = state.objeto;
      this.cargando = false;
      this.cdr.detectChanges(); 
    }

  
    await this.cargarObjeto();
  }

  async cargarObjeto() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        this.error = 'ID de objeto no válido';
        this.cargando = false;
        this.cdr.detectChanges();
        return;
      }

      console.log('🔄 Cargando objeto por ID:', id);
  
      const data = await firstValueFrom(
        this.prestameApi.obtenerObjetoPorId(id).pipe(timeout(5000))
      );
      this.objeto = data;
      this.cargando = false;
      console.log('Objeto cargado correctamente:', this.objeto);
      this.cdr.detectChanges(); // Forzar actualización
    } catch (err: any) {
      console.error('Error al cargar el objeto:', err);
      if (err.name === 'TimeoutError') {
        this.error = 'La petición tardó demasiado. Intenta de nuevo.';
      } else {
        this.error = 'No se pudo cargar el objeto';
      }
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  volver() {
    this.router.navigate(['/mis-objetos']);
  }

  editar() {
    if (this.objeto && this.objeto._id) {
      this.router.navigate(['/objeto-form', this.objeto._id]);
    }
  }
}
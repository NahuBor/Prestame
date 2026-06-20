import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrestameApi } from '../../prestame-api';
import { ChangeDetectorRef } from '@angular/core';
import { Objeto } from '../../interfaces/objeto.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-objetos-feed',
  imports: [CommonModule, RouterModule],
  templateUrl: './objetos-feed.html',
  styleUrl: './objetos-feed.css',
})
export class ObjetosFeedComponent implements OnInit {

  objetos: Objeto[] = [];
  cargando: boolean = false;
  error: string | null = null;

  categorias: string[] = ['herramientas', 'libros', 'otro'];
  categoriaSeleccionada: string = '';

  constructor(
    private apiService: PrestameApi,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.cargarObjetos();
  }

  async cargarObjetos(): Promise<void> {
    this.cargando = true;
    this.error = null;
    
    try {
      let response;
      if (this.categoriaSeleccionada) {
        response = await firstValueFrom(
          this.apiService.obtenerObjetosPorCategoria(this.categoriaSeleccionada)
        );
      } else {
        response = await firstValueFrom(
          this.apiService.obtenerObjetosPublicos()
        );
      }
      this.objetos = response || [];
      this.cdr.detectChanges();
    } catch (error: any) {
      console.log('Error al cargar objetos:', error);
      
      if (error.status === 404) {
        this.objetos = [];
        this.error = null;
      } else {
        this.error = 'Error al cargar los objetos. Intenta nuevamente.';
      }
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  async filtrarPorCategoria(categoria: string): Promise<void> {
    this.categoriaSeleccionada = this.categoriaSeleccionada === categoria ? '' : categoria;
    await this.cargarObjetos();
  }
  
  async solicitarObjeto(objetoId: string): Promise<void> {
    if (!objetoId) return;
    try {
      // PRESTAME 
      // await firstValueFrom(this.apiService.solicitarObjeto(objetoId));
      alert('Solicitud enviada correctamente');
    } catch (error) {
      console.log('Error al solicitar objeto:', error);
      alert('Error al enviar la solicitud de prestamo');
    }
  }

  onImageError(objeto: Objeto): void {
    objeto.imagen = 'assets/imagen-default.jpg';
  }
}
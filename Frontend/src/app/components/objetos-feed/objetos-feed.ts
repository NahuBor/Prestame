import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrestameApi } from '../../services/prestameApi.service';
import { ChangeDetectorRef } from '@angular/core';
import { Objeto } from '../../models/objeto.interface';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.cargarObjetos();
  }
    onRowClick(objeto: Objeto) {
   
    // Aquí puedes navegar a una ruta de detalle (si la tienes)
    this.router.navigate(['/objeto-detalle', objeto._id], { state: { objeto } });
    

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
  
solicitarObjeto(objetoId: string) {
  const dias = prompt('¿Cuántos días necesitas el préstamo? (1, 7 o 30)', '7');
  if (!dias || !['1','7','30'].includes(dias)) {
    alert('Por favor, elige 1, 7 o 30 días.');
    return;
  }
  this.apiService.crearPrestamo({ objetoId, tiempo_del_prestamo: dias }).subscribe({
    next: (resp) => {
      alert('Solicitud enviada correctamente');
      // Opcional: recargar la lista o cambiar el estado local
    },
    error: (err) => {
      alert('Error al enviar la solicitud: ' + err.message);
    }
  });
}
  onImageError(objeto: Objeto): void {
    objeto.imagen = 'assets/imagen-default.jpg';
  }
}
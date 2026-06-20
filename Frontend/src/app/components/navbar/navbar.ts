import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrestameApi } from '../../prestame-api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  usuarioLogueado: any = null;

  constructor(
    private prestameApi: PrestameApi,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const perfil = await firstValueFrom(this.prestameApi.obtenerPerfil());
      this.usuarioLogueado = perfil;
      this.cdr.detectChanges();
    } catch {
      this.usuarioLogueado = null;
    }
  }

  cerrarSesion() {
    this.prestameApi.logout().subscribe({
      next: () => {
        this.usuarioLogueado = null;
        this.cdr.detectChanges();
      }
    });
  }
}

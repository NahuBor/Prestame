import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router)

  public usuarioLogueado = this.authService.actualUser;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
  }

  cerrarSesion() {
    this.authService.logoutService().subscribe({
      next: () => {
        this.usuarioLogueado.set(null);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    })
  }
}

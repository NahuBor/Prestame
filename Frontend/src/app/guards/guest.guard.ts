import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export const guestGuard: CanActivateFn = (route, state) => {
    const _authService = inject(AuthService);
    const router = inject(Router);

    return _authService.checkSessionService().pipe(
        map((isSessionActive: boolean) => {
            if (isSessionActive) {
                // Si ya está logueado, lo mandamos a la sección interna
                router.navigate(['/objetos']); 
                return false; // Bloquea el acceso a la página de login/register
            } else {
                return true; // Si no está logueado, lo deja pasar al login tranquilamente
            }
        }),
        catchError(() => {
            // Si el backend da error (403/401) significa que NO hay sesión activa,
            // por ende, es un invitado válido y puede ver el login.
            return of(true);
        })
    );
}
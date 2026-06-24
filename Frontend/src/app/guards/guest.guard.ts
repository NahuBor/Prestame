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
                router.navigate(['/objetos']); 
                return false; 
            } else {
                return true; 
            }
        }),
        catchError(() => {

            return of(true);
        })
    );
}
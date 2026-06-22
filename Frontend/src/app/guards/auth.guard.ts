import {inject} from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {catchError, map} from "rxjs/operators"
import { of } from "rxjs";



export const authGuard: CanActivateFn = (route, state) => {
    const _authService = inject(AuthService);
    const router = inject(Router)

    return _authService.checkSessionService().pipe(
  
        map((isSessionActive: boolean) => {
            if (isSessionActive) {
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        }),
        catchError((error) => {
            router.navigate(['/login']);
            return of(false);
        })
    );
}
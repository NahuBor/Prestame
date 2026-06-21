import {inject} from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {map} from "rxjs/operators"


export const authGuard: CanActivateFn = (route, state) => {
    const _authService = inject(AuthService);
    const router = inject(Router)

    return _authService.checkSessionService()?.pipe(
  
        map((isSessionActive: boolean) => {
            console.log("PRUEBA "+ isSessionActive)
            if (isSessionActive) {
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        })
    );
}
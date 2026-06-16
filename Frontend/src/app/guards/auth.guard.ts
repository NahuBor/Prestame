import {inject} from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
    const _authService = inject(AuthService);
    const router = inject(Router)

    const isSessionActive = await _authService.checkSessionService()
    if (isSessionActive) {
        return true
    } else {
        router.navigate(['/login'])
        return false
    }
}
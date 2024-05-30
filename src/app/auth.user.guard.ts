import { inject } from "@angular/core"
import { AuthService } from "./services/auth.service"
import { Router } from "@angular/router"
import { map } from "rxjs"

export const AuthUserGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.user$.pipe(
    map(data => {
      if (data === null) {
        router.navigateByUrl('/login')
        return false
      }
      return true
    })
  )
}
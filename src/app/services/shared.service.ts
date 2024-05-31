import { Injectable, inject } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private authService = inject(AuthService)
  public navFade: boolean = false
  public lightMode: boolean = true
  public user: any

  constructor() {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
  }
}

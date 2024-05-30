import { Component, OnInit, inject, Renderer2 } from '@angular/core'
import { AuthService } from './services/auth.service'
import { SharedService } from './services/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public initial: string = ''
  public authService = inject(AuthService)
  public sharedService = inject(SharedService)
  public renderer = inject(Renderer2)
  public showMobileNav: boolean = false
  public showMobileNavDirty: boolean = false
  public mobileNavLinksNonUser = [
    { route: '/home', icon: 'home', label: 'Home' },
    { route: '/about', icon: 'info_outline', label: 'About' },
    { route: '/register', icon: 'person_add', label: 'Sign Up' },
    { route: '/login', icon: 'login', label: 'Login' }
  ]
  public mobileNavLinksUser = [
    { route: '/home', icon: 'home', label: 'Home' },
    { route: '/dashboard', icon: 'view_comfy', label: 'Dashboard' },
    { route: '/checklist', icon: 'check_box', label: 'Checklist' }
  ]

  ngOnInit(){
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!
        })
        this.initial = this.sharedService.user.displayName?.charAt(0)
      } else {
        this.authService.currentUserSignal.set(null)
      }
    })
  }

  public changeToDarkBackground(): void {
    if (this.sharedService.lightMode === false) {
      this.renderer.setStyle(document.body, 'background-color', 'black')
    } else {
      this.renderer.removeStyle(document.body, 'background-color')
    }
  }

  public logout(): void {
    this.authService.logout()
    window.location.reload()
  }
}

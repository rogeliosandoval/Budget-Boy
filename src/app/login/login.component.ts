import { Component, inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AuthService } from "../services/auth.service"
import { SharedService } from "../services/shared.service"
import { Router } from "@angular/router"

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup
  public errorMessage: string = ''
  public loading: boolean = false
  private authService = inject(AuthService)
  private sharedService = inject(SharedService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)

  constructor(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  public login(): void {
    this.loading = true
    this.sharedService.navFade = true
    const rawForm = this.loginForm.getRawValue()

    this.authService.login(rawForm.email, rawForm.password)
    .subscribe({
      next: response => {
        window.location.reload()
      },
      error: err => {
        this.loading = false
        this.sharedService.navFade = false
        if (err.code === 'auth/invalid-credential') {
          this.errorMessage = 'Wrong email or password. Please try again.'
        } else {
          this.errorMessage = err.code
        }
      }
    })
  }
}
import { Component, inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms"
import { AuthService } from "../services/auth.service"
import { SharedService } from "../services/shared.service"
// import { Router } from "@angular/router"
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AngularFireList } from '@angular/fire/compat/database'

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup
    const passwordControl = formGroup.controls[password]
    const confirmPasswordControl = formGroup.controls[confirmPassword]

    if (!passwordControl || !confirmPasswordControl) {
      return null
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      // return if another validator has already found an error on the confirmPasswordControl
      return null
    }

    // set error on confirmPasswordControl if validation fails
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true })
    } else {
      confirmPasswordControl.setErrors(null)
    }

    return null
  }
}

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent {
  private database = inject(AngularFireDatabase)
  private databaseUsersPath = '/users/'
  private authService = inject(AuthService)
  private sharedService = inject(SharedService)
  private formBuilder = inject(FormBuilder)
  // private router = inject(Router)
  public usersRef: AngularFireList<any>
  public registerForm: FormGroup
  public loading: boolean = false
  public errorMessage: string = ''
  public showErrors: boolean = false

  constructor(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    })

    this.usersRef = this.database.list(this.databaseUsersPath)
  }

  public register(): void {
    if (this.registerForm.valid) {
      this.loading = true
      this.sharedService.navFade = true
      const rawForm = this.registerForm.getRawValue()
      const databaseForm = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      }
  
      this.authService.register(rawForm.username, rawForm.email, rawForm.password)
      .subscribe({
        next: response => {
          this.usersRef.push(databaseForm)
          window.location.reload()
        },
        error: err => {
          this.loading = false
          this.sharedService.navFade = false
          if (err.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Email is laready in use. Please use another email.'
          } else {
            this.errorMessage = err.code
          }
        }
      })
    } else {
      this.showErrors = true
    }
  }
}
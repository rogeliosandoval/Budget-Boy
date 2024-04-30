import { Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent {
  public registerForm: FormGroup;
  public loading: boolean = false;
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public register(): void {
    this.loading = true;
    const rawForm = this.registerForm.getRawValue();

    this.authService.register(rawForm.username, rawForm.email, rawForm.password)
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/');
        },
        error: err => {
          this.loading = false;
          throw err;
        }
      })
  }
}
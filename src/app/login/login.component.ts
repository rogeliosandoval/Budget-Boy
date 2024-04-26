import { Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(
    private formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      });
  }
}
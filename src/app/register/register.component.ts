import { Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/shared.service";
import { Router } from "@angular/router";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})

export class RegisterComponent {
  private database = inject(AngularFireDatabase);
  private databasePath = '/users/'
  private authService = inject(AuthService);
  private sharedService = inject(SharedService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  public usersRef: AngularFireList<any>
  public registerForm: FormGroup;
  public loading: boolean = false;
  public errorMessage: string = '';

  constructor(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.usersRef = this.database.list(this.databasePath);
  }

  public register(): void {
    this.loading = true;
    this.sharedService.navFade = true;
    const rawForm = this.registerForm.getRawValue();
    const databaseForm = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.authService.register(rawForm.username, rawForm.email, rawForm.password)
      .subscribe({
        next: response => {
          this.usersRef.push(databaseForm);
          window.location.reload();
        },
        error: err => {
          this.loading = false;
          this.sharedService.navFade = false;
          if (err.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Email is laready in use. Please use another email.'
          } else {
            this.errorMessage = err.code
          }
        }
      })
  }
}
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  private authService = inject(AuthService);
  public lightMode: boolean = true;
  public user: any;

  constructor() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public lightMode: boolean = true;
  public authService = inject(AuthService);

  ngOnInit(){
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}

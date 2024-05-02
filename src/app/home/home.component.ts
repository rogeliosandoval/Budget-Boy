import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent {
  public authService = inject(AuthService);
  public user: any;
}
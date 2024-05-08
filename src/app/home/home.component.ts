import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { SharedService } from "../services/shared.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  public authService = inject(AuthService);
  public sharedService = inject(SharedService);
  public user: any;

  ngOnInit(): void {
    this.sharedService.navFade = false;
  }
}
import { Component, inject } from "@angular/core"
import { SharedService } from "../services/shared.service"

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss']
})

export class AboutComponent {
  public sharedService = inject(SharedService)
}
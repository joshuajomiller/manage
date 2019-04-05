import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  private currentInvite: any;

  constructor(private authService: AuthService) {
    if (this.authService.currentInvite){
      this.currentInvite = this.authService.currentInvite;
      console.log(this.authService.currentInvite);
    }
  }

  ngOnInit() {
  }

}

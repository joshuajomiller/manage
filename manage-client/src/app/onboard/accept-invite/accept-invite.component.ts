import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  public currentInvite: any;

  constructor(private authService: AuthService, private router: Router) {
    this.currentInvite = this.authService.getCurrentInvite();
    console.log(this.currentInvite);
    if (!this.currentInvite){
      this.router.navigate(['/auth/login'])
    }
  }

  ngOnInit() {
  }

}

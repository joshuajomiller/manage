import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {OnboardService} from "../../onboard/onboard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showLogin = true;

  constructor( private authService: AuthService, private router: Router) {
    this.authService.logout();
    this.authService.currentInvite = null;
  }
  ngOnInit() {}

  login({email, password, remember}) {
    this.authService.login(email, password, remember)
      .subscribe(user => {
        if (user && user.token) {
          if (user.user.profile.team){
            //TODO add support for multiple teams
            if (!user.user.profile.team.members.length){
              this.router.navigate(['/onboard/invite-team']);
            } else {
              this.router.navigate(['/my-info']);
            }
          } else {
            //check for invite in system
            this.authService.checkForInvite(email)
              .subscribe(invite => {
                if (invite){
                  this.authService.currentInvite = invite;
                  this.router.navigate(['/onboard/accept-invite']);
                } else {
                  this.router.navigate(['/onboard/new-profile']);
                }
              });
          }

        }
      });
  }

  register({firstName, lastName, email, password, remember}) {
    this.authService.register(firstName, lastName, email, password)
      .subscribe(status => {
        if (status && status.created) {
          this.login({email, password, remember});
        }
      });
  }

  toggleCard() {
    this.showLogin = !this.showLogin;
  }

}

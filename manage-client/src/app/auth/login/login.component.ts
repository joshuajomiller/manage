import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showLogin = true;

  constructor( private authService: AuthService, private router: Router) {
    this.authService.logout();
  }
  ngOnInit() {}

  login({email, password, remember}) {
    this.authService.login(email, password, remember)
      .subscribe(user => {
        if (user && user.token) {
          this.router.navigate(['/auth/invite-team']);
          // if (user.user.profile.team){
          //   this.router.navigate(['/my-info']);
          // } else if (user.user.profile.organisation) {
          //   this.router.navigate(['/auth/add-team']);
          // } else {
          //   this.router.navigate(['/auth/add-organisation']);
          // }
        }
      });
  }

  register({firstName, lastName, email, password, remember}) {
    this.authService.register(firstName, lastName, email, password, remember)
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

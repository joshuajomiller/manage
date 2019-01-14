import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public remember: boolean;
  public showLogin = true;

  constructor( private authService: AuthService, private router: Router) {
    this.authService.logout();
  }
  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password, this.remember)
      .subscribe(user => {
        if (user && user.token) {
          if (user.user.profile.organisation){
            this.router.navigate(['/my-info']);
          } else {
            this.router.navigate(['/login/add-organisation']);
          }
        }
      });
  }

  register() {
    this.authService.register(this.firstName, this.lastName, this.email, this.password, this.remember)
      .subscribe(status => {
        if (status && status.created) {
          this.login();
        }
      });
  }

  toggleCard() {
    this.showLogin = !this.showLogin;
  }

}

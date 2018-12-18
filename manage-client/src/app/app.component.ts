import { Component } from '@angular/core';
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.authStatusChange.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}

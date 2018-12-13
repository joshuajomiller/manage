import {Injectable} from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser')){
      this.isLoggedIn = true;
    }
  }

  login(email: string, password: string, remember: boolean) {
    const url = 'api/login';
    return this.http.post<User>(url, {email: email, password: password})
      .pipe(
        tap(user => {
            this.setUser(user, remember)
          }
        )
      );
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string, remember: boolean) {
    return this.http.post<User>('/api/user', {email: email, password: password})
      .pipe(
        tap(user => {
            this.setUser(user, remember)
          }
        )
      );
  }

  setUser(user: User, remember: boolean) {
    this.user = user;
    if (remember){
      localStorage.setItem('currentUser', JSON.stringify(user.token));
    }
  }
}

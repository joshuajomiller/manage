import {Injectable} from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from "rxjs/internal/operators";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  authStatusChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user){
      this.toggleAuthStatusChange(true);
    }
  }

  login(email: string, password: string, remember: boolean) {
    const url = 'api/auth/login';
    return this.http.post<User>(url, {email: email, password: password})
      .pipe(
        tap(user => {
          if (user && user.token){
            this.setUser(user, remember)
          }
        })
      );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('currentUser');
    this.toggleAuthStatusChange(false);
  }

  register(name: string, email: string, password: string, remember: boolean) {
    return this.http.post<{created}>('/api/user', {name: name, email: email, password: password});
  }

  setUser(user: User, remember: boolean) {
    this.user = user;
    this.toggleAuthStatusChange(true);
    if (remember){
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUserToken(): string {
    return this.user && this.user.token;
  }

  isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService;
    const userToken = this.getUserToken();
    try {
      return userToken && jwtHelper.isTokenExpired(userToken);
    } catch (err) {
      return false;
    }
  }

  toggleAuthStatusChange(status: boolean) {
    this.authStatusChange.next(status);
  }
}

import {Injectable} from '@angular/core';
import {CurrentUser, OrganisationDetails} from "./user";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from "rxjs/internal/operators";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: CurrentUser;
  public currentInvite = null;
  authStatusChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
    if (user){
      this.setUser(user, true);
    }
  }

  login(email: string, password: string, remember: boolean) {
    const url = 'api/auth/login';
    return this.http.post<CurrentUser>(url, {email: email, password: password})
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
    sessionStorage.removeItem('currentUser');
    this.toggleAuthStatusChange(false);
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<{created}>('/api/auth/user', {firstName: firstName, lastName: lastName, email: email, password: password});
  }

  checkForInvite(email: string) {
    return this.http.get<any>('/api/invite/email/' + email);
  }

  setUser(user: CurrentUser, remember: boolean) {
    this.user = user;
    if (user.user.profile.organisation){
      this.toggleAuthStatusChange(true);
    }
    if (remember){
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
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

  getOrganisationByCode(organisationCode) {
    return this.http.get<OrganisationDetails>('/api/organisation/code/'+ organisationCode);
  }

  getTeamPreferences(){
    return this.http.get<any>('/api/team/preferences');
  }

  updateTeamFeedbackPreferences(preferences){
    return this.http.put<{updated: boolean}>('/api/team/preferences/feedback', preferences);
  }
}

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.redirectUrl = state.url;
    return this.checkLogin(state.url)
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean  {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()){
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}

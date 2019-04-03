import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./shell/auth.guard";

const routes: Routes = [
  {
    path: 'onboard',
    loadChildren: 'src/app/onboard/onboard.module#OnboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

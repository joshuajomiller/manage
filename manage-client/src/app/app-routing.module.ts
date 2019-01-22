import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from "./shell/shell/shell.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'src/app/auth/auth.module#AuthModule'
  },
  {
    path: 'login',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: ShellComponent,
  //   children: [
  //     { path: 'my-info', component: ShellComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

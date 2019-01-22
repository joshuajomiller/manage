import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from "./shell/shell.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'src/app/auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'my-info', loadChildren: 'src/app/my-info/my-info.module#MyInfoModule'},
      { path: 'team', loadChildren: 'src/app/team/team.module#TeamModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from "./shell/shell.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard]},
      { path: 'my-info', loadChildren: 'src/app/my-info/my-info.module#MyInfoModule', canLoad: [AuthGuard]},
      { path: 'team', loadChildren: 'src/app/team/team.module#TeamModule', canLoad: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }

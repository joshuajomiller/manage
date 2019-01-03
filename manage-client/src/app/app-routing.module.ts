import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'src/app/auth/auth.module#AuthModule'
  },
  {
    path: 'my-info',
    loadChildren: 'src/app/my-info/my-info.module#MyInfoModule'
  },
  {
    path: 'team',
    loadChildren: 'src/app/team/team.module#TeamModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

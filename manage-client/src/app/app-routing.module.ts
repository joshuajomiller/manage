import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-info',
    loadChildren: 'src/app/my-info/my-info.module#MyInfoModule'
  },
  {
    path: '',
    redirectTo: '/my-info',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

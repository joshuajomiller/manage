import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddOrganisationComponent} from "./add-organisation/add-organisation.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'add-organisation',
    component: AddOrganisationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { AddOrganisationComponent } from './add-organisation/add-organisation.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent, AddOrganisationComponent]
})
export class AuthModule { }

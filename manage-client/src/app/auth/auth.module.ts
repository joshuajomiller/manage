import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from "./auth.service";
import {LoginComponent} from "./login/login.component";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }

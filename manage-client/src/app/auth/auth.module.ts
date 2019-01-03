import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }

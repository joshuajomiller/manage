import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddOrganisationComponent} from './add-organisation/add-organisation.component';
import {ConfirmJoinOrganisationComponent} from './confirm-join-organisation/confirm-join-organisation.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {AddTeamComponent} from './add-team/add-team.component';
import {ConfirmJoinTeamComponent} from './confirm-join-team/confirm-join-team.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {FeedbackPreferencesComponent} from './feedback-preferences/feedback-preferences.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthComponent} from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule.forRoot()
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent, AddOrganisationComponent, ConfirmJoinOrganisationComponent, AddTeamComponent, ConfirmJoinTeamComponent, LoginFormComponent, RegisterFormComponent, FeedbackPreferencesComponent, WelcomeComponent, AuthComponent],
  entryComponents: [ConfirmJoinOrganisationComponent]
})
export class AuthModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddOrganisationComponent} from "./add-organisation/add-organisation.component";
import {AddTeamComponent} from "./add-team/add-team.component";
import {FeedbackPreferencesComponent} from "./feedback-preferences/feedback-preferences.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'add-organisation', component: AddOrganisationComponent },
      { path: 'add-team', component: AddTeamComponent },
      { path: 'feedback-preferences', component: FeedbackPreferencesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

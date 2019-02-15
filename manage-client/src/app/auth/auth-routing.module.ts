import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddOrganisationComponent} from "./add-organisation/add-organisation.component";
import {AddTeamComponent} from "./add-team/add-team.component";
import {InviteTeamComponent} from "./invite-team/invite-team.component";
import {FeedbackPreferencesComponent} from "./feedback-preferences/feedback-preferences.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add-organisation', component: AddOrganisationComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: 'invite-team', component: InviteTeamComponent },
  { path: 'feedback-preferences', component: FeedbackPreferencesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

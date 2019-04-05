import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProfileComponent } from "./new-profile/new-profile.component";
import {InviteTeamComponent} from "./invite-team/invite-team.component";
import {AcceptInviteComponent} from "./accept-invite/accept-invite.component";

const routes: Routes = [
    { path: '', redirectTo: 'new-profile', pathMatch: 'full' },
    { path: 'new-profile', component: NewProfileComponent, pathMatch: 'full'},
    { path: 'invite-team', component: InviteTeamComponent, pathMatch: 'full'},
    { path: 'accept-invite', component: AcceptInviteComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProfileComponent } from "./new-profile/new-profile.component";
import {InviteTeamComponent} from "./invite-team/invite-team.component";

const routes: Routes = [
    { path: '', redirectTo: 'new-profile', pathMatch: 'full' },
    { path: 'new-profile', component: NewProfileComponent, pathMatch: 'full'},
    { path: 'invite-team', component: InviteTeamComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardRoutingModule { }

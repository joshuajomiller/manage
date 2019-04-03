import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardRoutingModule } from './onboard-routing.module';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { AcceptInviteComponent } from './accept-invite/accept-invite.component';
import { InviteTeamComponent } from "./invite-team/invite-team.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OnboardRoutingModule
  ],
  declarations: [NewProfileComponent, AcceptInviteComponent, InviteTeamComponent]
})
export class OnboardModule { }

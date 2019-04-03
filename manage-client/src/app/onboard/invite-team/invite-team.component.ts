import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {OnboardService} from "../onboard.service";

@Component({
  selector: 'app-invite-team',
  templateUrl: './invite-team.component.html',
  styleUrls: ['./invite-team.component.scss']
})
export class InviteTeamComponent implements OnInit {

  public inviteForm: FormGroup;
  public invitedMembers = [];
  public sendingInvite = false;

  constructor(private fb: FormBuilder, private onboardService: OnboardService) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  ngOnInit() {
    this.onboardService.getInvitedTeamMembers().subscribe(response=> {
      this.invitedMembers = response.invited;
    });
  }

  invite(){
    this.sendingInvite = true;
    this.onboardService.inviteTeamMember(this.inviteForm.value).subscribe(response=>{
      if (response.invited){
        this.invitedMembers.push({
          email: this.inviteForm.controls['email'].value,
          status: 'pending'
        });
        this.inviteForm.controls['email'].setValue('');
      }
      this.sendingInvite = false;
    });
  }

  removeInvite(email){
    this.onboardService.removeTeamMember({email}).subscribe(response => {
      if (response.removed){
        this.invitedMembers.splice(this.invitedMembers.findIndex(user => user.email === email), 1);
      }
    });
  }

}

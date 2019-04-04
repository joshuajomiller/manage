import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {OnboardService} from "../onboard.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user";

@Component({
  selector: 'app-invite-team',
  templateUrl: './invite-team.component.html',
  styleUrls: ['./invite-team.component.scss']
})
export class InviteTeamComponent implements OnInit {

  public inviteForm: FormGroup;
  public invitedMembers = [];
  public sendingInvite = false;
  public currentError;
  public currentUser: User;

  constructor(private fb: FormBuilder, private onboardService: OnboardService, private authService: AuthService) {
    this.clearCurrentError();
    this.currentUser = this.authService.user.user;
    this.inviteForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, currentUserValidator(this.currentUser)]],
    });
  }

  ngOnInit() {
    this.onboardService.getInvitedTeamMembers().subscribe(response=> {
      this.invitedMembers = response.invited;
    });
  }

  invite(){
    this.sendingInvite = true;
    this.onboardService.inviteTeamMember(this.inviteForm.value).subscribe(response => {
      if (response.invited) {
        this.invitedMembers.push({
          email: this.inviteForm.controls['email'].value,
          status: 'pending'
        });
        this.inviteForm.controls['email'].setValue('');
      }
      this.sendingInvite = false;
    }, error => {
      this.currentError.show = true;
      this.currentError.message = error.error.msg;
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

  clearCurrentError(){
  this.currentError = {
      message: "",
      show: false
    };
  }

}

function currentUserValidator(currentUser: User): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = currentUser.email === control.value;
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-invite-team',
  templateUrl: './invite-team.component.html',
  styleUrls: ['./invite-team.component.scss']
})
export class InviteTeamComponent implements OnInit {

  public inviteForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  ngOnInit() {
  }

  invite(){
    this.authService.inviteTeamMember(this.inviteForm.value).subscribe(response=>{
      if (response.invited){
        this.inviteForm.controls['email'].setValue('');
      }
    });
  }

}

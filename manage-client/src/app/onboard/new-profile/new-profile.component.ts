import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OnboardService} from "../onboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private onBoardService: OnboardService, private router: Router) {
    this.profileForm = this.fb.group({
      organisationName: ['', [Validators.required]],
      teamName: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  save(){
    this.onBoardService.createOrganisation(this.profileForm.value.organisationName).subscribe(organisation => {
      this.onBoardService.joinOrganisation(organisation.id).subscribe(res=>{
        this.onBoardService.createTeam(this.profileForm.value.teamName).subscribe(team => {
          this.onBoardService.joinTeam(team.id).subscribe(()=> this.router.navigate(['/onboard/invite-team']));
        })
      })
    })
  }
}

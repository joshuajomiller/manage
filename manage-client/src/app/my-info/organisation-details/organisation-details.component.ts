import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../auth/user";

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit, OnChanges {

  @Input() user: User;

  public organisationDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.user && this.user.profile) {
      this.organisationDetailsForm = this.fb.group({
        organisationName: [this.user.profile.organisation.name],
        organisationURL: [this.user.profile.organisation.url],
        organisationTeamsForm: this.fb.group({
          teamName: [''],
          teamBoss: [''],
        })
      });
    }
  }

}

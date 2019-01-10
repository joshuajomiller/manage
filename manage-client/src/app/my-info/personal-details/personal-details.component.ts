import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {User} from "../../auth/user";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit, OnChanges {

  @Input() user: User;

  public personalDetailsForm;

  constructor(private fb: FormBuilder) {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      companyPosition: [''],
      birthDate: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.personalDetailsForm.value);
  }

  ngOnChanges() {
    this.personalDetailsForm = this.fb.group({
      firstName: [this.user.profile.details.firstName, Validators.required],
      lastName: [this.user.profile.details.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.profile.details.phone],
      companyPosition: ['', Validators.required],
      birthDate: [this.user.profile.details.birthDate]
    });
  }

}

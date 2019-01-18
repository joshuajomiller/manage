import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators, FormArray, FormGroup} from '@angular/forms';
import {User} from "../../auth/user";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Output() userDetailsSubmit = new EventEmitter<User>();

  public personalDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  onSubmit() {
    this.userDetailsSubmit.emit(this.personalDetailsForm.value);
  }

  ngOnChanges() {
    if (this.user && this.user.profile) {
      this.personalDetailsForm = this.fb.group({
        firstName: [this.user.profile.details.firstName, Validators.required],
        lastName: [this.user.profile.details.lastName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        phone: [this.user.profile.details.phone],
        birthDate: [this.user.profile.details.birthDate]
      });
    }
  }

}

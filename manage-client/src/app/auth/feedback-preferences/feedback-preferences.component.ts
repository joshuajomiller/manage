import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-feedback-preferences',
  templateUrl: './feedback-preferences.component.html',
  styleUrls: ['./feedback-preferences.component.scss']
})
export class FeedbackPreferencesComponent implements OnInit {

  public feedbackPreferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedbackPreferencesForm = this.fb.group({
      daily: [true],
      weekly: [true],
      monthly: [true],
    });
  }

  ngOnInit() {
  }

}

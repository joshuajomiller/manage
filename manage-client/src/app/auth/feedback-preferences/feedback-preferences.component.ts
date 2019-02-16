import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feedback-preferences',
  templateUrl: './feedback-preferences.component.html',
  styleUrls: ['./feedback-preferences.component.scss']
})
export class FeedbackPreferencesComponent implements OnInit {

  public feedbackPreferencesForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authService.getTeamPreferences()
      .subscribe(preferences => {
        let weeklyVal = (preferences && preferences.feedback.weekly !== undefined) ? preferences.feedback.weekly : true;
        let monthlyVal = (preferences && preferences.feedback.monthly !== undefined) ? preferences.feedback.monthly : true;
        this.feedbackPreferencesForm = this.fb.group({
          weekly: [weeklyVal],
          monthly: [monthlyVal],
        });
      });
  }

  ngOnInit() {
  }

  save() {
    this.authService.updateTeamFeedbackPreferences(this.feedbackPreferencesForm.value).subscribe(response => {
      if (response.updated){
        this.router.navigate(['/auth/invite-team']);
      }
    });
  }

}

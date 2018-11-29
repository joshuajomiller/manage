import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  companyDetailsForm = this.fb.group({
    companyName: [''],
    companyURL: [''],
    companyTeamsForm: this.fb.group({
      teamName: [''],
      teamBoss: [''],
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}

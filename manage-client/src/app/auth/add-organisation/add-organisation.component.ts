import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {
  organisationCode: string;
  organisationName: string;
  organisationUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  joinOrganisation(code){
    this.authService.joinOrganisation(code || this.organisationCode).subscribe(res => {
      if (res.joined){
        this.authService.toggleAuthStatusChange(true);
        this.router.navigate(['/my-info']);
      }
    });
  }

  createOrganisation(){
    this.authService.createOrganisation(this.organisationName, this.organisationUrl).subscribe(res => {
      if (res && res.code){
        this.joinOrganisation(res.code);
      }
    });
  }
}

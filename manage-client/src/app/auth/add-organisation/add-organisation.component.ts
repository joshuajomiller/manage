import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {
  organisationCode: string;
  organisationName: string;
  organisationUrl: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  joinOrganisation(code){
    this.authService.joinOrganisation(code || this.organisationCode).subscribe(res => {
      console.log(res);
    });
  }

  createOrganisation(){
    this.authService.createOrganisation(this.organisationName, this.organisationUrl).subscribe(res => {
      if (res && res.id){
        this.joinOrganisation(res.id);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ConfirmJoinOrganisationComponent} from "../confirm-join-organisation/confirm-join-organisation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {
  organisationCode: string;
  organisationName: string;
  organisationUrl: string;

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  getOrganisationByCode(code){
    this.authService.getOrganisationByCode(code || this.organisationCode).subscribe(res => {
      if (res){
          const modalRef = this.modalService.open(ConfirmJoinOrganisationComponent);
          modalRef.componentInstance.name = 'ConfirmJoinOrganisation';
      }
    });
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

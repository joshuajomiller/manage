import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrganisationDetails, User} from "../user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-join-organisation',
  templateUrl: './confirm-join-organisation.component.html',
  styleUrls: ['./confirm-join-organisation.component.scss']
})
export class ConfirmJoinOrganisationComponent implements OnInit {

  @Input() org: OrganisationDetails;
  @Output() orgConfirm = new EventEmitter<OrganisationDetails>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  confirm(){
    this.orgConfirm.emit(this.org);
    this.activeModal.close();
  }

  cancel(){
    this.activeModal.close();
  }
}

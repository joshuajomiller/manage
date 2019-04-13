import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {OnboardService} from "../onboard.service";

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  public currentInvite: any;

  constructor(private authService: AuthService, private router: Router, private onboardService: OnboardService) {
    this.currentInvite = this.authService.getCurrentInvite();
    console.log(this.currentInvite);
    if (!this.currentInvite){
      this.router.navigate(['/auth/login'])
    }
  }

  ngOnInit() {
  }

  acceptInvite(){
    this.onboardService.acceptInvite(this.currentInvite._id).subscribe(response=>{
      this.router.navigate(['/my-info'])
    })
  }

  declineInvite(){
    this.onboardService.declineInvite(this.currentInvite._id).subscribe(response=>{
      this.router.navigate(['/onboard/new-profile'])
    })
  }

}

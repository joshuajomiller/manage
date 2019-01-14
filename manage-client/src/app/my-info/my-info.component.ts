import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";
import {User, UserDetails} from "../auth/user";

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserDetails().subscribe(user => {
      this.user = user;
    })
  }

  savePersonalDetails(userDetails: UserDetails){
    this.user.profile.details = userDetails;
    this.updateUser();
  }

  updateUser(){
    this.userService.updateUserDetails(this.user).subscribe(res => {

    })
  }
}

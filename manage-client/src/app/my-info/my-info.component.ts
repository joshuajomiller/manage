import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user.service";
import {User} from "../auth/user";

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

  saveUserDetails(user: User){
    this.userService.updateUserDetails(user).subscribe(res => {
      console.log(res);
    })
  }
}

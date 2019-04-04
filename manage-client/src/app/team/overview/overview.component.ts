import { Component, OnInit } from '@angular/core';
import {TeamService} from "../team.service";
import {Member} from "../member";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public teamMembers;

  constructor(public teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getMyTeamMembers().subscribe(members => {
      this.teamMembers = members;
    });

  }

}

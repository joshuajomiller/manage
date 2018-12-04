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
    this.teamMembers = this.teamService.getMyTeamMembers();
    this.teamMembers.forEach(member =>{
      member.tasksNew = member.tasks.filter(task => {return task.status === 'new'});
      member.tasksInProgress = member.tasks.filter(task => {return task.status === 'progress'});
      member.newRequests = member.requests.filter(request => {return request.status === 'pending'});
    })
  }

}

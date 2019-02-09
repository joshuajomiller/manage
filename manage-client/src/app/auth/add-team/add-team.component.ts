import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {TeamDetails} from "../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  teams: TeamDetails[];
  teamName: string;
  teamId: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    this.authService.getTeams().subscribe(teams=>{
      this.teams = teams;
    })
  }

  createTeam() {
    this.authService.createTeam(this.teamName).subscribe(team => {
      this.joinTeam(team.id, true);
    })
  }

  joinTeam(teamId, isCreator?){
    this.authService.joinTeam(teamId || this.teamId).subscribe(teamId => {
      if (isCreator){
        this.router.navigate(['/auth/invite-team']);
      } else {
        this.router.navigate(['/my-info']);
      }
    })
  }
}

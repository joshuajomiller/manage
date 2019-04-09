import { Injectable } from '@angular/core';
import {OrganisationDetails, TeamDetails} from "../auth/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  constructor(private http: HttpClient) { }

  createOrganisation(organisationName, organisationUrl?) {
    return this.http.post<OrganisationDetails>('/api/organisation/', {organisationName, organisationUrl})
  }

  joinOrganisation(organisationId) {
    return this.http.post<{joined: boolean}>('/api/user/join-organisation', {organisationId});
  }

  getTeams(){
    return this.http.get<TeamDetails[]>(`/api/team`)
  }

  createTeam(teamName){
    return this.http.post<TeamDetails>('/api/team/', {teamName})
  }

  joinTeam(teamId){
    return this.http.post<{joined: boolean}>('/api/user/join-team', {teamId})
  }

  getInvitedTeamMembers(){
    return this.http.get<{invited: any}>('/api/invite/team')
  }

  inviteTeamMember(email){
    return this.http.post<{invited: boolean}>('/api/invite', email)
  }

  removeTeamMember(email){
    return this.http.post<{removed: boolean}>('/api/invite/remove', email)
  }

  acceptInvite(id){
    return this.http.put<{accepted: boolean}>('/api/invite/' + id + '/accept', null)
  }
}

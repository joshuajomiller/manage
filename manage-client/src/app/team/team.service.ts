import {Injectable} from '@angular/core';
import {Member} from "./member";
import {User} from "../auth/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {pluck} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {}

  getMyTeamMembers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user/team').pipe(pluck('members'));

    // return [
    //   {
    //     fullName: "Alisa Kosinov",
    //     image: "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person",
    //     position: "UI Developer",
    //     status: "Working",
    //     requests: [
    //       {
    //         type: "Vacation",
    //         text: "Vacation in Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'pending'
    //       },
    //       {
    //         type: "Vacation",
    //         text: "Vacation out of Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'Approved'
    //       },
    //     ],
    //     tasks: [
    //       {
    //         title: "ITA-2029",
    //         description: "UI not showing something here",
    //         link: "http://jira:8080/browse/ITA-2029",
    //         status: "new"
    //       },
    //       {
    //       title: "ITA-2029",
    //       description: "UI not showing something here",
    //       link: "http://jira:8080/browse/ITA-2029",
    //       status: "progress"
    //     }],
    //   },
    //   {
    //     fullName: "Matan Sar Shalom",
    //     image: "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person",
    //     position: "UI Developer",
    //     status: "Working",
    //     requests: [
    //       {
    //         type: "Vacation",
    //         text: "Vacation in Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'pending'
    //       },
    //       {
    //         type: "Vacation",
    //         text: "Vacation out of Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'Approved'
    //       },
    //     ],
    //     tasks: [{
    //       title: "ITA-2029",
    //       description: "UI not showing something here",
    //       link: "http://jira:8080/browse/ITA-2029",
    //       status: "new"
    //     }],
    //   },
    //   {
    //     fullName: "Mattan Leibovich",
    //     image: "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person",
    //     position: "UI Developer",
    //     status: "Working",
    //     requests: [
    //       {
    //         type: "Vacation",
    //         text: "Vacation in Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'pending'
    //       },
    //       {
    //         type: "Vacation",
    //         text: "Vacation out of Israel",
    //         date_created: new Date(),
    //         date_requested_start: new Date(),
    //         date_requested_end: new Date(),
    //         status: 'Approved'
    //       },
    //     ],
    //     tasks: [{
    //       title: "ITA-2029",
    //       description: "UI not showing something here",
    //       link: "http://jira:8080/browse/ITA-2029",
    //       status: "new"
    //     }],
    //   }
    // ]
  }
}

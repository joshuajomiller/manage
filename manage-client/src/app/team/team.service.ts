import {Injectable} from '@angular/core';
import {Member} from "./member";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() {}

  getMyTeamMembers(): Member[] {
    return [
      {
        fullName: "Alisa Kosinov",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350",
        position: "UI Developer",
        status: "Working",
        requests: [
          {
            type: "Vacation",
            text: "Vacation in Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'pending'
          },
          {
            type: "Vacation",
            text: "Vacation out of Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'Approved'
          },
        ],
        tasks: [
          {
            title: "ITA-2029",
            description: "UI not showing something here",
            link: "http://jira:8080/ITA-2029",
            status: "new"
          },
          {
          title: "ITA-2029",
          description: "UI not showing something here",
          link: "http://jira:8080/ITA-2029",
          status: "progress"
        }],
      },
      {
        fullName: "Matan Sar Shalom",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350",
        position: "UI Developer",
        status: "Working",
        requests: [
          {
            type: "Vacation",
            text: "Vacation in Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'pending'
          },
          {
            type: "Vacation",
            text: "Vacation out of Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'Approved'
          },
        ],
        tasks: [{
          title: "ITA-2029",
          description: "UI not showing something here",
          link: "http://jira:8080/ITA-2029",
          status: "new"
        }],
      },
      {
        fullName: "Mattan Leibovich",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350",
        position: "UI Developer",
        status: "Working",
        requests: [
          {
            type: "Vacation",
            text: "Vacation in Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'pending'
          },
          {
            type: "Vacation",
            text: "Vacation out of Israel",
            date_created: new Date(),
            date_requested_start: new Date(),
            date_requested_end: new Date(),
            status: 'Approved'
          },
        ],
        tasks: [{
          title: "ITA-2029",
          description: "UI not showing something here",
          link: "http://jira:8080/ITA-2029",
          status: "new"
        }],
      }
    ]
  }
}

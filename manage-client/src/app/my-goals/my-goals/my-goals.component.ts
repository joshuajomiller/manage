import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.scss']
})
export class MyGoalsComponent implements OnInit {

  model: any;

  constructor() {
    this.model = [];
    const modelObj = {
      title: "Goal Title",
      description: "Here is a description for your goal that I would really like you to do.",
      tags: ["personal", "growth"],
      status: "open"
    };
    for (let x=0; x < 15; x++){
      this.model.push({...modelObj});
    }
  }

  ngOnInit() {
  }

  toggleTaskStatus(goal){
    goal.status = (goal.status === "open" ? 'pending' : 'open');
  }
}

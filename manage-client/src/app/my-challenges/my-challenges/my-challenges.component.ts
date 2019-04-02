import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.scss']
})
export class MyChallengesComponent implements OnInit {

  model: any;

  constructor() {
    this.model = [];
    const modelObj = {
      title: "Challenge Title",
      description: "Here is a description for your challenge that I would really like you to do.",
      tags: ["personal", "growth"],
      status: "open",
      rank: 'gold'
    };
    for (let x=0; x < 15; x++){
      this.model.push({...modelObj});
    }
  }

  ngOnInit() {
  }

  toggleChallengeStatus(challenge){
    challenge.status = (challenge.status === "open" ? 'pending' : 'open');
  }
}

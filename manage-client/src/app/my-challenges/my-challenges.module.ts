import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyChallengesRoutingModule } from './my-challenges-routing.module';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';

@NgModule({
  imports: [
    CommonModule,
    MyChallengesRoutingModule
  ],
  declarations: [MyChallengesComponent]
})
export class MyChallengesModule { }

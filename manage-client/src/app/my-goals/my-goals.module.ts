import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyGoalsRoutingModule } from './my-goals-routing.module';
import { MyGoalsComponent } from './my-goals/my-goals.component';

@NgModule({
  imports: [
    CommonModule,
    MyGoalsRoutingModule
  ],
  declarations: [MyGoalsComponent]
})
export class MyGoalsModule { }

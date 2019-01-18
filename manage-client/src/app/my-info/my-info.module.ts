import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInfoComponent } from './my-info.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import {MyInfoRoutingModule} from "./my-info-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TaskManagementDetailsComponent } from './task-management-details/task-management-details.component';
import { OrganisationDetailsComponent } from './organisation-details/organisation-details.component';

@NgModule({
  imports: [
    CommonModule,
    MyInfoRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [MyInfoComponent, PersonalDetailsComponent, TaskManagementDetailsComponent, OrganisationDetailsComponent]
})
export class MyInfoModule { }

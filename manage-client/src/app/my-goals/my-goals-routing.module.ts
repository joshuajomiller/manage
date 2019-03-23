import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../shell/auth.guard";
import {MyGoalsComponent} from "./my-goals/my-goals.component";

const routes: Routes = [
  { path: '', component: MyGoalsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyGoalsRoutingModule {
}

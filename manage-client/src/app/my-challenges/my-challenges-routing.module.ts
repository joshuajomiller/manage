import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../shell/auth.guard";
import {MyChallengesComponent} from "./my-challenges/my-challenges.component";

const routes: Routes = [
  { path: '', component: MyChallengesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyChallengesRoutingModule {
}

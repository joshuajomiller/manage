import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from "./shell-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ShellRoutingModule,
  ],
  exports: [
    HeaderComponent, SidebarComponent
  ],
  declarations: [HeaderComponent, SidebarComponent, ShellComponent]
})
export class ShellModule { }

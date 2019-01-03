import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent, SidebarComponent
  ],
  declarations: [HeaderComponent, SidebarComponent]
})
export class ShellModule { }

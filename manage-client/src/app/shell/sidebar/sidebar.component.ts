import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public links;

  constructor() {
    this.links = [
      { title: 'My Info', link: '/my-info', icon: 'far fa-user'},
      { title: 'Team', link: '/team', icon: 'fas fa-users'},
      { title: 'Employee Directory', link: '/directory', icon: 'far fa-address-book'},
      { title: 'Shared Files', link: '/files', icon: 'far fa-folder-open'},
    ]
  }

  ngOnInit() {
  }

}

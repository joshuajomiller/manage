import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmJoinTeamComponent } from './confirm-join-team.component';

describe('ConfirmJoinTeamComponent', () => {
  let component: ConfirmJoinTeamComponent;
  let fixture: ComponentFixture<ConfirmJoinTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmJoinTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmJoinTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

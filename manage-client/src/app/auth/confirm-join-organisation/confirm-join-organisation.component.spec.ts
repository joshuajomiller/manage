import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmJoinOrganisationComponent } from './confirm-join-organisation.component';

describe('ConfirmJoinOrganisationComponent', () => {
  let component: ConfirmJoinOrganisationComponent;
  let fixture: ComponentFixture<ConfirmJoinOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmJoinOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmJoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

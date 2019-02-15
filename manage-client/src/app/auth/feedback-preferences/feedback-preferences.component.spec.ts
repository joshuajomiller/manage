import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPreferencesComponent } from './feedback-preferences.component';

describe('FeedbackPreferencesComponent', () => {
  let component: FeedbackPreferencesComponent;
  let fixture: ComponentFixture<FeedbackPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTrackerComponent } from './system-tracker.component';

describe('SystemTrackerComponent', () => {
  let component: SystemTrackerComponent;
  let fixture: ComponentFixture<SystemTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployableCsvComponent } from './deployable-csv.component';

describe('DeployableCsvComponent', () => {
  let component: DeployableCsvComponent;
  let fixture: ComponentFixture<DeployableCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployableCsvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeployableCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

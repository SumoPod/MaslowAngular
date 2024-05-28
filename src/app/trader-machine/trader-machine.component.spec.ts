import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderMachineComponent } from './trader-machine.component';

describe('TraderMachineComponent', () => {
  let component: TraderMachineComponent;
  let fixture: ComponentFixture<TraderMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraderMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraderMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

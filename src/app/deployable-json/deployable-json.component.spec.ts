import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployableJsonComponent } from './deployable-json.component';

describe('DeployableJsonComponent', () => {
  let component: DeployableJsonComponent;
  let fixture: ComponentFixture<DeployableJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployableJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeployableJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

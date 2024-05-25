import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJsonComponent } from './user-json.component';

describe('UserJsonComponent', () => {
  let component: UserJsonComponent;
  let fixture: ComponentFixture<UserJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

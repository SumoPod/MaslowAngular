import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCsvComponent } from './ranking-csv.component';

describe('RankingCsvComponent', () => {
  let component: RankingCsvComponent;
  let fixture: ComponentFixture<RankingCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingCsvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

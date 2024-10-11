import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnrolledTraineesComponent } from './view-enrolled-trainees.component';

describe('ViewEnrolledTraineesComponent', () => {
  let component: ViewEnrolledTraineesComponent;
  let fixture: ComponentFixture<ViewEnrolledTraineesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEnrolledTraineesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEnrolledTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraineesComponent } from './view-trainees.component';

describe('ViewTraineesComponent', () => {
  let component: ViewTraineesComponent;
  let fixture: ComponentFixture<ViewTraineesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTraineesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTraineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

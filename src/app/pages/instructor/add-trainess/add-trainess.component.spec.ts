import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainessComponent } from './add-trainess.component';

describe('AddTrainessComponent', () => {
  let component: AddTrainessComponent;
  let fixture: ComponentFixture<AddTrainessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrainessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSprintsComponent } from './view-sprints.component';

describe('ViewSprintsComponent', () => {
  let component: ViewSprintsComponent;
  let fixture: ComponentFixture<ViewSprintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSprintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

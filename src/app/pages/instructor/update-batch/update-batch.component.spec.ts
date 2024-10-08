import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatchComponent } from './update-batch.component';

describe('UpdateBatchComponent', () => {
  let component: UpdateBatchComponent;
  let fixture: ComponentFixture<UpdateBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

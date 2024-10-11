import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCertificationComponent } from './create-certification.component';

describe('CreateCertificationComponent', () => {
  let component: CreateCertificationComponent;
  let fixture: ComponentFixture<CreateCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCertificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCertificationsComponent } from './view-certifications.component';

describe('ViewCertificationsComponent', () => {
  let component: ViewCertificationsComponent;
  let fixture: ComponentFixture<ViewCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCertificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

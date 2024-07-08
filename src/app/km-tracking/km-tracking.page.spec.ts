import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KmTrackingPage } from './km-tracking.page';

describe('KmTrackingPage', () => {
  let component: KmTrackingPage;
  let fixture: ComponentFixture<KmTrackingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KmTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

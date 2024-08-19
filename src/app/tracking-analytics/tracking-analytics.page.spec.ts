import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingAnalyticsPage } from './tracking-analytics.page';

describe('TrackingAnalyticsPage', () => {
  let component: TrackingAnalyticsPage;
  let fixture: ComponentFixture<TrackingAnalyticsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

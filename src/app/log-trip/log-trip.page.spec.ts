import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogTripPage } from './log-trip.page';

describe('LogTripPage', () => {
  let component: LogTripPage;
  let fixture: ComponentFixture<LogTripPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

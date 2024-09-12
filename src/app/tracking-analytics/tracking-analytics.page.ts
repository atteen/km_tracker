import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TripAction } from '../store/trip/trip.actions';
import { GetDrivers } from '../store/driver/driver.actions';
import { GetJobs } from '../store/job/job.actions';
import { GetVehicles } from '../store/vehicle/vehicle.actions';
import { Router } from '@angular/router';
import { Driver, Vehicle, Job } from '../models';
import { DriverState } from '../store/driver/driver.state';
import { JobState } from '../store/job/job.state';
import { VehicleState } from '../store/vehicle/vehicle.state';


@Component({
  selector: 'app-tracking-analytics',
  templateUrl: './tracking-analytics.page.html',
  styleUrls: ['./tracking-analytics.page.scss'],
})
export class TrackingAnalyticsPage implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  jobs: Job[] = [];

  constructor(
    private store: Store,
    private router: Router,
  ) {
    
   }

  ngOnInit() {
    this.store.dispatch(new GetDrivers());
    this.store.dispatch(new GetVehicles());
    this.store.dispatch(new GetJobs());

    this.store.select(DriverState.getDrivers).subscribe((drivers) => {
      this.drivers = drivers;
    });

    this.store.select(VehicleState.getVehicles).subscribe((vehicles) => {
      this.vehicles = vehicles;
    });

    this.store.select(JobState.getJobs).subscribe((jobs) => {
      this.jobs = jobs;
      
    });
  }

}

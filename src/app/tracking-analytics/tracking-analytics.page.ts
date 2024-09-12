import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
// import { TripAction } from '../store/trip/trip.actions';
import { Driver, Vehicle, Job, Trip } from '../models';

import { DriverAction } from '../store/driver/driver.actions';
import { DriverState } from '../store/driver/driver.state';
import { GetJobs } from '../store/job/job.actions';
import { JobState } from '../store/job/job.state';
import { GetVehicles } from '../store/vehicle/vehicle.actions';
import { VehicleState } from '../store/vehicle/vehicle.state';
import { TripAction } from '../store/trip/trip.actions';
import { TripState } from '../store/trip/trip.state';

@Component({
  selector: 'app-tracking-analytics',
  templateUrl: './tracking-analytics.page.html',
  styleUrls: ['./tracking-analytics.page.scss'],
})
export class TrackingAnalyticsPage implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  jobs: Job[] = [];
  trips: Trip[] = [];

  filters = ['Drivers', 'Jobs', 'Vehicles'];

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new DriverAction.Get());
    this.store.dispatch(new TripAction.Get());
    this.store.dispatch(new GetVehicles());
    this.store.dispatch(new GetJobs());

    this.store.select(DriverState.getDrivers).subscribe((drivers) => {
      this.drivers = drivers;
    });

    this.store.select(TripState.getTrips).subscribe((trips) => {
      this.trips = trips;
    });

    this.store.select(VehicleState.getVehicles).subscribe((vehicles) => {
      this.vehicles = vehicles;
    });

    this.store.select(JobState.getJobs).subscribe((jobs) => {
      this.jobs = jobs;
    });
  }
}

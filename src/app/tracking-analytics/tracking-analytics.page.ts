import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Driver, Vehicle, Job, Trip, AccumulatedKm } from '../models';

import { DriverAction } from '../store/driver/driver.actions';
import { DriverState } from '../store/driver/driver.state';
import { GetJobs } from '../store/job/job.actions';
import { JobState } from '../store/job/job.state';
import { GetVehicles } from '../store/vehicle/vehicle.actions';
import { VehicleState } from '../store/vehicle/vehicle.state';
import { TripAction } from '../store/trip/trip.actions';
import { TripState } from '../store/trip/trip.state';
import { AccumulatedKmAction } from '../store/accumulated-km/accumulated-km.actions';
import { AccumulatedKmState } from '../store/accumulated-km/accumulated-km.state';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tracking-analytics',
  templateUrl: './tracking-analytics.page.html',
  styleUrls: ['./tracking-analytics.page.scss'],
})
export class TrackingAnalyticsPage implements OnInit {
  isModalOpen = false;
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  jobs: Job[] = [];
  trips: Trip[] = [];
  accumulated_kms: AccumulatedKm[] = [];

  grouped_kms: { vehicleId: string; kms: AccumulatedKm[]; totalKm: number }[] =
    [];
  pieChartData: { name: string; value: number }[] = [];
  grandTotalKm: number = 0;

  filters = ['Drivers', 'Jobs', 'Vehicles'];

  @Input() view: any;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  group2: any;

  constructor(private store: Store, private router: Router, private platform: Platform) {}

  ngOnInit() {
    this.store.dispatch(new DriverAction.Get());
    this.store.dispatch(new TripAction.Get());
    this.store.dispatch(new AccumulatedKmAction.Get());
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

    this.store
      .select(AccumulatedKmState.getAccumulatedKm)
      .subscribe((accumulated_km) => {
        this.accumulated_kms = accumulated_km;
        this.groupKmsByVehicle();
        this.preparePieChartData(); 
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleScreenSizeChange()
  }

  handleScreenSizeChange() {
    const width = this.platform.width();
    const height = this.platform.height();
    console.log(width, height);
    if (width > height) {
      this.view = [0.9 * width, 0.9 * height]
    } else {
      this.view = [0.95 * width, 0.35 * height]
    }
    
  }

  // Helper function to group accumulated_kms by vehicle_id and calculate total km
  groupKmsByVehicle() {
    let total = 0;

    const grouped = this.accumulated_kms.reduce((acc, current) => {
      const vehicleGroup = acc.find(
        (group) => group.vehicleId === current.vehicle_id
      );
      if (vehicleGroup) {
        vehicleGroup.kms.push(current);
        vehicleGroup.totalKm += current.accumulated_km; // Add to total km
      } else {
        acc.push({
          vehicleId: current.vehicle_id,
          kms: [current],
          totalKm: current.accumulated_km,
        });
      }
      total += current.accumulated_km; // Add to grand total
      return acc;
    }, [] as { vehicleId: string; kms: AccumulatedKm[]; totalKm: number }[]);

    this.grouped_kms = grouped;
    this.grandTotalKm = total; // Set the grand total
  }

  preparePieChartData() {
    this.pieChartData = this.grouped_kms.map(group => {
      return {
        name: this.getVehicleName(group.vehicleId), // Use vehicle name as label
        value: group.totalKm // Total kilometers for the vehicle
      };
    });
  }

  // Helper function to get the vehicle name by ID
  getVehicleName(vehicleId: string): string {
    const vehicle = this.vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown vehicle';
  }

  getJobName(jobId: string): string {
    const job = this.jobs.find((j) => j.id === jobId);
    return job ? job.name : 'Unknown job';
  }

  setOpen(isOpen: boolean, group: any) {
    this.isModalOpen = isOpen;
    this.group2 = group
    console.log(this.isModalOpen);
    
  }
}

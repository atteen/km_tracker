import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Driver, Vehicle } from '../models';

@Component({
  selector: 'app-log-trip',
  templateUrl: './log-trip.page.html',
  styleUrls: ['./log-trip.page.scss'],
})
export class LogTripPage implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  trip = {
    driverId: '',
    vehicleId: '',
    kilometers: 0,
  };

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    this.drivers = await this.supabase.getDrivers();
    this.vehicles = await this.supabase.getVehicles();
    console.log(this.vehicles);
  }

  async logTrip() {
    const { driverId, vehicleId, kilometers } = this.trip;
    await this.supabase.logTrip(driverId, vehicleId, kilometers);
  }
}

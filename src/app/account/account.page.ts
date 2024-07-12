import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, SupabaseService } from '../supabase.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Driver, Vehicle } from '../models';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];

  trip = {
    vehicleId: '',
    kilometers: 0,
    job: '',
  };

  profile: Profile = {
    username: '',
    avatar_url: '',
    website: '',
  };

  email = '';

  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {}

  @ViewChild(IonModal) modal!: IonModal;

  async ngOnInit() {
    this.getEmail();
    this.getProfile();
    this.drivers = await this.supabase.getDrivers();
    this.vehicles = await this.supabase.getVehicles();
  }

  async getEmail() {
    this.email = await this.supabase.user.then((user) => user?.email || '');
  }

  async getProfile() {
    try {
      const { data: profile, error, status } = await this.supabase.profile;
      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        this.profile = profile;
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async logTrip() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      const { vehicleId, kilometers, job } = this.trip;
      await this.supabase.logTrip(vehicleId, kilometers, job);
      await loader.dismiss();
      await this.supabase.createNotice('Trip Logged!');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(error.message);
    }
  }

  async signOut() {
    console.log('testing?');
    await this.supabase.signOut();
    this.router.navigate(['/'], { replaceUrl: true });
  }

  // async logIt() {
  //   this.router.navigate(['/log-trip'], { replaceUrl: true });
  // }

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm(avatar_url: string = '') {
    const loader = await this.supabase.createLoader();
    await loader.present();
    try {
      const { error } = await this.supabase.updateProfile({
        ...this.profile,
        avatar_url,
      });
      if (error) {
        throw error;
      }
      await loader.dismiss();
      await this.supabase.createNotice('Profile updated!');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(error.message);
    }

    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }
}

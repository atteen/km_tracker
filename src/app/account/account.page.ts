import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Store } from '@ngxs/store';
import {
  GetEmail,
  GetProfile,
  UpdateProfile,
} from '../store/profile/profile.actions';
import { GetDrivers } from '../store/driver/driver.actions';
import { GetVehicles } from '../store/vehicle/vehicle.actions';
import { GetJobs } from '../store/job/job.actions';
import { ProfileState } from '../store/profile/profile.state';
import { DriverState } from '../store/driver/driver.state';
import { VehicleState } from '../store/vehicle/vehicle.state';
import { JobState } from '../store/job/job.state';
import { Driver, Vehicle, Job } from '../models';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  jobs: Job[] = [];

  tripForm: FormGroup;
  profileForm: FormGroup;

  errors = [
    { type: 'required', message: 'field cannot be empty' },
    {
      type: 'invalidKilometers',
      message: 'Km cannot be the same/less than the current km',
    },
  ];

  profile = {
    username: '',
    avatar_url: '',
    website: '',
  };

  email = '';
  isModalOpen = false;
  isProfileModalOpen = false;

  constructor(
    private store: Store,
    private router: Router,
    private readonly supabase: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {
    this.tripForm = new FormGroup({
      vehicleId: new FormControl(''),
      kilometers: new FormControl(null, [
        Validators.required,
        this.kilometersValidator(),
      ]),
      job: new FormControl('', Validators.required),
    });

    this.profileForm = new FormGroup({
      email: new FormControl({ value: '', disabled: true }),
      username: new FormControl(''),
      website: new FormControl(''),
    });
  }

  @ViewChild(IonModal) modal!: IonModal;

  async ngOnInit() {
    // Dispatch actions to fetch data
    this.store.dispatch(new GetProfile());
    this.store.dispatch(new GetDrivers());
    this.store.dispatch(new GetVehicles());
    this.store.dispatch(new GetJobs());
    this.store.dispatch(new GetEmail());

    // Subscribe to NGXS state changes
    this.store.select(ProfileState.getProfile).subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        this.profileForm.patchValue(profile);
        this.checkUsernameAndOpenModal();
      }
    });

    this.store.select(ProfileState.getEmail).subscribe((email) => {
      if (email) {
        this.email = email;
        this.profileForm.get('email')?.setValue(email);
      }
    });

    this.store.select(DriverState.getDrivers).subscribe((drivers) => {
      this.drivers = drivers;
    });

    this.store.select(VehicleState.getVehicles).subscribe((vehicles) => {
      this.vehicles = vehicles;
    });

    this.store.select(JobState.getJobs).subscribe((jobs) => {
      this.jobs = jobs;
    });

    this.tripForm.get('kilometers')?.valueChanges.subscribe(() => {
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  checkUsernameAndOpenModal() {
    const username = this.profileForm.get('username')?.value;
    if (!username) {
      this.isModalOpen = true; // Open the modal if the username is empty or null
    }
  }

  onVehicleChange(event: any) {
    const vehicleId = event.detail.value; // Get the selected vehicle ID from the event
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    );

    if (selectedVehicle) {
      this.tripForm.get('kilometers')?.setValue(selectedVehicle.current_km);
    }

    this.tripForm.get('kilometers')?.updateValueAndValidity();
  }

  kilometersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const vehicleId = this.tripForm?.get('vehicleId')?.value;
      const selectedVehicle = this.vehicles.find(
        (vehicle) => vehicle.id === vehicleId
      );
      if (selectedVehicle && control.value <= selectedVehicle.current_km) {
        return { invalidKilometers: true };
      }
      return null;
    };
  }

  async logTrip() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      const { vehicleId, kilometers, job } = this.tripForm.value;
      // Add your trip logging logic here using the Supabase service
      await loader.dismiss();
      await this.createNotice('Trip Logged!');
    } catch (error: any) {
      await loader.dismiss();
      await this.createNotice(error.message);
    }
  }

  async signOut() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      // Dispatch sign out logic here
      await this.supabase.signOut();
      await loader.dismiss();
      await this.createNotice('Logged Out');
      this.modal.dismiss(null, 'close');
      this.router.navigate(['/'], { replaceUrl: true });
    } catch (error: any) {
      await loader.dismiss();
    }
  }

  openProfile() {
    this.isProfileModalOpen = true;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm(avatar_url: string = '') {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      const updatedProfile = {
        ...this.profile,
        ...this.profileForm.value,
        avatar_url,
      };
      await this.store.dispatch(new UpdateProfile(updatedProfile)).toPromise();
      await loader.dismiss();
      await this.createNotice('Profile updated!');
      this.modal.dismiss(null, 'close');
    } catch (error: any) {
      await loader.dismiss();
      await this.createNotice(error.message);
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  goToAdmin() {
    this.router.navigate(['/tracking-analytics']);
  }

  // Helper methods for loading and notifications
  async createLoader() {
    return await new Promise((resolve) => {
      // Simulate a loader creation here
      resolve({
        present: () => Promise.resolve(),
        dismiss: () => Promise.resolve(),
      });
    });
  }

  async createNotice(message: string) {
    return await new Promise((resolve) => {
      // Simulate a toast or notice
      console.log(message);
      resolve(true);
    });
  }
}

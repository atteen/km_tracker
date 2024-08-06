import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
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

  tripForm: FormGroup;
  profileForm: FormGroup;

  errors = [
    { type: 'required', message: 'field cannot be empty' },
    {
      type: 'invalidKilometers',
      message: 'Km cannot be less than the current km',
    },
  ];

  profile: Profile = {
    username: '',
    avatar_url: '',
    website: '',
  };

  email = '';
  isModalOpen = false;

  constructor(
    private readonly supabase: SupabaseService,
    private router: Router,
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
    this.getEmail();
    this.getProfile();
    this.drivers = await this.supabase.getDrivers();
    this.vehicles = await this.supabase.getVehicles();
    this.checkUsernameAndOpenModal();

    this.tripForm.get('job')?.valueChanges.subscribe((value) => {
      this.cdr.detectChanges();
    });
    this.tripForm.get('kilometers')?.valueChanges.subscribe((value) => {
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
      if (selectedVehicle && control.value < selectedVehicle.current_km) {
        return { invalidKilometers: true };
      }
      return null;
    };
  }

  async getEmail() {
    this.email = await this.supabase.user.then((user) => user?.email || '');
    this.profileForm.get('email')?.setValue(this.email);
  }

  async getProfile() {
    try {
      const { data: profile, error, status } = await this.supabase.profile;
      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        this.profile = profile;
        this.profileForm.patchValue(profile);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async logTrip() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      const { vehicleId, kilometers, job } = this.tripForm.value;
      await this.supabase.logTrip(vehicleId, kilometers, job);
      await this.supabase.updateVehicleKm(vehicleId, kilometers); // Update the vehicle's kilometers
      await loader.dismiss();
      await this.supabase.createNotice('Trip Logged!');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(error.message);
    }
  }

  async signOut() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      await this.supabase.signOut();
      this.router.navigate(['/'], { replaceUrl: true });
      await loader.dismiss();
      await this.supabase.createNotice('Logged Out');
    } catch (error: any) {}
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
      const { error } = await this.supabase.updateProfile(updatedProfile);
      if (error) {
        throw error;
      }
      await loader.dismiss();
      await this.supabase.createNotice('Profile updated!');
      this.getProfile();
      this.modal.dismiss(null, 'cancel');
    } catch (error: any) {
      await loader.dismiss();
      await this.supabase.createNotice(error.message);
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}

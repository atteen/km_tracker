import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Driver, Vehicle, Trip, Job, Profile } from './models';

// export interface Profile {
//   username: string;
//   website: string;
//   avatar_url: string;
// }

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get user() {
    return this.supabase.auth.getUser().then(({ data }) => data?.user);
  }

  get session() {
    return this.supabase.auth.getSession().then(({ data }) => data?.session);
  }

  get profile() {
    return this.user
      .then((user) => user?.id)
      .then((id) =>
        this.supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', id)
          .single()
      );
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  async updateProfile(profile: Profile) {
    const user = await this.user;
    const update = {
      ...profile,
      id: user?.id,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader() {
    return this.loadingCtrl.create();
  }

  async getDrivers(): Promise<Driver[]> {
    let { data, error } = await this.supabase.from('profiles').select('*');

    if (error) {
      throw error;
    }

    return data as Driver[];
  }

  async getVehicles(): Promise<Vehicle[]> {
    let { data, error } = await this.supabase.from('vehicles').select('*');

    if (error) {
      throw error;
    }

    return data as Vehicle[];
  }

  async getJobs() : Promise<Job[]> {
    let { data, error } = await this.supabase.from('jobs').select('*');    

    if (error) {
      throw error;
    }

    return data as Job[];
  }

  async getTrips() : Promise<Trip[]> {
    let { data, error } = await this.supabase.from('trips').select('*');    

    if (error) {
      throw error;
    }

    return data as Trip[];
  }

  async logTrip(vehicleId: string, kilometers: number, job: string): Promise<Trip> {
    const user = await this.user;
    const { data, error } = await this.supabase
      .from('trips')
      .insert([{ driver_id: user?.id, vehicle_id: vehicleId, kilometers, job }])
      .single();

    if (error) {
      throw error;
    }

    return data as Trip;
  }

  async updateVehicleKm(vehicleId: string, kilometers: number): Promise<void> {
    const { error } = await this.supabase
      .from('vehicles')
      .update({ current_km: kilometers })
      .eq('id', vehicleId);
    
    if (error) {
      throw error;
    }
  }
}

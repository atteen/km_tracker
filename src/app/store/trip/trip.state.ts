import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { TripAction } from './trip.actions';
import { Trip } from '../../models';

export interface TripStateModel {
  trips: Trip[];
  loading: boolean;
}

@State<TripStateModel>({
  name: 'trip',
  defaults: {
    trips: [],
    loading: false,
  },
})
@Injectable()
export class TripState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getTrips(state: TripStateModel) {
    return state.trips;
  }

  @Action(TripAction.Get)
  async getTrips(ctx: StateContext<TripStateModel>) {
    ctx.patchState({ loading: true });
    const trips = await this.supabaseService.getTrips();
    ctx.patchState({ trips, loading: false });
  }
}

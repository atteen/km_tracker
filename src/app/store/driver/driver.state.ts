import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { DriverAction } from './driver.actions';
import { Driver } from '../../models';

export interface DriverStateModel {
  drivers: Driver[];
  loading: boolean;
}

@State<DriverStateModel>({
  name: 'drivers',
  defaults: {
    drivers: [],
    loading: false,
  },
})
@Injectable()
export class DriverState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getDrivers(state: DriverStateModel) {
    return state.drivers;
  }

  @Action(DriverAction.Get)
  async getDrivers(ctx: StateContext<DriverStateModel>) {
    ctx.patchState({ loading: true });
    const drivers = await this.supabaseService.getDrivers();
    ctx.patchState({ drivers, loading: false });
  }
}

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { GetVehicles } from './vehicle.actions';
import { Vehicle } from '../../models';

export interface VehicleStateModel {
  vehicles: Vehicle[];
  loading: boolean;
}

@State<VehicleStateModel>({
  name: 'vehicles',
  defaults: {
    vehicles: [],
    loading: false,
  },
})
@Injectable()
export class VehicleState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getVehicles(state: VehicleStateModel) {
    return state.vehicles;
  }

  @Action(GetVehicles)
  async getVehicles(ctx: StateContext<VehicleStateModel>) {
    ctx.patchState({ loading: true });
    const vehicles = await this.supabaseService.getVehicles();
    ctx.patchState({ vehicles, loading: false });
  }
}

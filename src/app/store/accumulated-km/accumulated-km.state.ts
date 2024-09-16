import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SupabaseService } from 'src/app/supabase.service';
import { AccumulatedKmAction } from './accumulated-km.actions';
import { AccumulatedKm } from 'src/app/models';

export interface AccumulatedKmStateModel {
  accumulated_kms: AccumulatedKm [];
  loading: boolean;
}

@State<AccumulatedKmStateModel>({
  name: 'accumulatedKm',
  defaults: {
    accumulated_kms: [],
    loading: false
  }
})
@Injectable()
export class AccumulatedKmState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getAccumulatedKm(state: AccumulatedKmStateModel) {
    return state.accumulated_kms;
  }

  @Action(AccumulatedKmAction.Get)
  async getDrivers(ctx: StateContext<AccumulatedKmStateModel>) {
    ctx.patchState({ loading: true });
    const accumulated_kms = await this.supabaseService.getAccumulatedKms();
    ctx.patchState({ accumulated_kms, loading: false });
  }
}

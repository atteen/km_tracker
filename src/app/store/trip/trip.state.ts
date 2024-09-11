import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TripAction } from './trip.actions';
import { Trip } from '../../models';

export interface TripStateModel {
  trips: Trip[];
}

@State<TripStateModel>({
  name: 'trip',
  defaults: {
    trips: [],
  },
})
@Injectable()
export class TripState {

  @Action(TripAction.Get)
  get(ctx: StateContext<TripStateModel>) {
    console.log('get action dispatched');
    
  }
}

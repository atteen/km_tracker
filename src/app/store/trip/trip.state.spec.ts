import { TestBed } from '@angular/core/testing';
import {  NgxsModule,  Store } from '@ngxs/store';
import { TripState, TripStateModel } from './trip.state';
import { TripAction } from './trip.actions';

describe('Trip store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [NgxsModule.forRoot([TripState])] 
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: TripStateModel = {
      items: ['item-1']
    };
    store.dispatch(new TripAction('item-1'));
    const actual = store.selectSnapshot(TripState.getState);
    expect(actual).toEqual(expected);
  });

});

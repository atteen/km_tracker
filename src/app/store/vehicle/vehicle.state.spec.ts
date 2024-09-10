import { TestBed } from '@angular/core/testing';
import {  NgxsModule,  Store } from '@ngxs/store';
import { VehicleState, VehicleStateModel } from './vehicle.state';
import { VehicleAction } from './vehicle.actions';

describe('Vehicle store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [NgxsModule.forRoot([VehicleState])] 
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: VehicleStateModel = {
      items: ['item-1']
    };
    store.dispatch(new VehicleAction('item-1'));
    const actual = store.selectSnapshot(VehicleState.getState);
    expect(actual).toEqual(expected);
  });

});

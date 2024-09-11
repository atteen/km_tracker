import { TestBed } from '@angular/core/testing';
import {  NgxsModule,  Store } from '@ngxs/store';
import { DriverState, DriverStateModel } from './driver.state';
import { DriverAction } from './driver.actions';

describe('Driver store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [NgxsModule.forRoot([DriverState])] 
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: DriverStateModel = {
      items: ['item-1']
    };
    store.dispatch(new DriverAction('item-1'));
    const actual = store.selectSnapshot(DriverState.getState);
    expect(actual).toEqual(expected);
  });

});

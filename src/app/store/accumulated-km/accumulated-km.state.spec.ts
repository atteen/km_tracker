import { TestBed } from '@angular/core/testing';
import {  NgxsModule,  Store } from '@ngxs/store';
import { AccumulatedKmState, AccumulatedKmStateModel } from './accumulated-km.state';
import { AccumulatedKmAction } from './accumulated-km.actions';

describe('AccumulatedKm store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [NgxsModule.forRoot([AccumulatedKmState])] 
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: AccumulatedKmStateModel = {
      items: ['item-1']
    };
    store.dispatch(new AccumulatedKmAction('item-1'));
    const actual = store.selectSnapshot(AccumulatedKmState.getState);
    expect(actual).toEqual(expected);
  });

});

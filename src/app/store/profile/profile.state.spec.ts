import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProfileState, ProfileStateModel } from './profile.state';
import { ProfileAction } from '../profile.actions';

describe('Profile store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProfileState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ProfileStateModel = {
      items: ['item-1'],
    };
    store.dispatch(new ProfileAction('item-1'));
    const actual = store.selectSnapshot(ProfileState.getState);
    expect(actual).toEqual(expected);
  });
});

import { TestBed } from '@angular/core/testing';
import {  NgxsModule,  Store } from '@ngxs/store';
import { JobState, JobStateModel } from './job.state';
import { JobAction } from './job.actions';

describe('Job store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [NgxsModule.forRoot([JobState])] 
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: JobStateModel = {
      items: ['item-1']
    };
    store.dispatch(new JobAction('item-1'));
    const actual = store.selectSnapshot(JobState.getState);
    expect(actual).toEqual(expected);
  });

});

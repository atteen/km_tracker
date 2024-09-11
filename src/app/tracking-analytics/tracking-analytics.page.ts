import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TripAction } from '../store/trip/trip.actions';


@Component({
  selector: 'app-tracking-analytics',
  templateUrl: './tracking-analytics.page.html',
  styleUrls: ['./tracking-analytics.page.scss'],
})
export class TrackingAnalyticsPage implements OnInit {

  private _store = inject(Store)

  constructor() {
    this._store.dispatch(new TripAction.Get())
   }

  ngOnInit() {
  }

}

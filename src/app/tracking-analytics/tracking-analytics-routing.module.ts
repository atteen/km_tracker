import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingAnalyticsPage } from './tracking-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingAnalyticsPageRoutingModule {}

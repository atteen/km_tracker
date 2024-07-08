import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KmTrackingPage } from './km-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: KmTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmTrackingPageRoutingModule {}

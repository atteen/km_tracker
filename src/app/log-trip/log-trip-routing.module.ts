import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogTripPage } from './log-trip.page';

const routes: Routes = [
  {
    path: '',
    component: LogTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogTripPageRoutingModule {}

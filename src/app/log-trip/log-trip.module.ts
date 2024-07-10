import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogTripPageRoutingModule } from './log-trip-routing.module';

import { LogTripPage } from './log-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogTripPageRoutingModule
  ],
  declarations: [LogTripPage]
})
export class LogTripPageModule {}

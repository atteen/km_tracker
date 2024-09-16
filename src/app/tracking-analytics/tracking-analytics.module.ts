import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingAnalyticsPageRoutingModule } from './tracking-analytics-routing.module';

import { TrackingAnalyticsPage } from './tracking-analytics.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingAnalyticsPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [TrackingAnalyticsPage]
})
export class TrackingAnalyticsPageModule {}

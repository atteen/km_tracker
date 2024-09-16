import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TripState } from './store/trip/trip.state';
import { ProfileState } from './store/profile/profile.state';
import { DriverState } from './store/driver/driver.state';
import { VehicleState } from './store/vehicle/vehicle.state';
import { JobState } from './store/job/job.state';
import { AccumulatedKmState } from './store/accumulated-km/accumulated-km.state';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(
      [TripState, ProfileState, DriverState, VehicleState, JobState, AccumulatedKmState],
      { developmentMode: /** !environment.production */ false }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxChartsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

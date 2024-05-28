import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightSearchListComponent } from './components/flight-search-list/flight-search-list.component';
@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    FlightsComponent,
    FlightSearchListComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [HomePageComponent, LoginComponent]
})
export class HomeModule {
}

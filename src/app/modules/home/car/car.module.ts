import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { CarRoutingModule } from './car-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    CarRoutingModule,
    ReactiveFormsModule
  ]
})
export class CarModule { }

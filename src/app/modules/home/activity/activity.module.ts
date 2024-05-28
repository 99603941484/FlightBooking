import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ActivityComponent],
  imports: [   
    ActivityRoutingModule,
    ReactiveFormsModule,  
    CommonModule  
  ]
})
export class ActivityModule { }

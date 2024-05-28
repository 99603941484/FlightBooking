import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { FlightsComponent } from './modules/home/components/flights/flights.component';
import { HomePageComponent } from './modules/home/components/home-page/home-page.component';
import { LoginComponent } from './modules/home/components/login/login.component';


import { FlightSearchListComponent } from './modules/home/components/flight-search-list/flight-search-list.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{path: "", redirectTo: '/home', pathMatch: "full"},
	{path: "home", component: HomePageComponent, 
		children: [
			{path: 'login', component: LoginComponent},
			{path: 'flights', component: FlightsComponent,canActivate: [AuthGuard]},			
			{path: 'search-list', component: FlightSearchListComponent,
			//canActivate: [AuthGuard]
		}    
  		]
	},
	{
		path: 'cars',
		loadChildren: () => import('./modules/home/car/car.module').then(m => m.CarModule),
		//canLoad: [AuthGuard]
	},
	{
		path: 'hotels',
		loadChildren: () => import('./modules/home/hotel/hotel.module').then(m => m.HotelModule),
		canLoad: [AuthGuard]
	},
	{
		path: 'activity',
		loadChildren: () => import('./modules/home/activity/activity.module').then(m => m.ActivityModule),
		canLoad: [AuthGuard]
	},
  	{path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

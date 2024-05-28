import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-flight-search-list',
  templateUrl: './flight-search-list.component.html',
  styleUrls: ['./flight-search-list.component.scss']
})
export class FlightSearchListComponent implements OnInit {
	flightList:any;
	isSubmitted = false; 
	dataLoaded = false; 
	airlines:any;
	product:any;
	inputRequest:any;
	filtersData:any;
	originalData:any;	
	filterToApply = { 
        classType: [],
		airlines :[],
		sortBy:'pricelow',
		Price:0
	};
	cabin:any;
	business:any;
	economy:any;
	displayStyle = "none"; 
  	popupFlight:any;
	classType = [
		{ name: 'Economy Class', findValue:"economy",checked: true },
		{ name: 'Business Class', findValue:"business",checked: true },
		{ name: 'Cabin Class', findValue:"cabin", checked: true },   
	];
	filterOption = [];
	priceSlider = {min:0,max:1};
	constructor(private router: Router,private activatedroute: ActivatedRoute, private commonService:CommonService) { 
		this.flightList = [];	
		this.getFlightDetails();
		this.getAirlinesList();    
	}
  	priceSliderChanged(event: any) {		
		this.filterToApply.Price = event.target.value;	
		this.refreshData()	
	}
	initFilter(){
		this.classType.map(item=>{
			this.filterToApply.classType.push(item.findValue)
		});
		this.airlines.map(item=>{
			this.filterToApply.airlines.push(item.findValue)
		})
	}
	
  	applyFliter(type){
		this.classType.map((item) =>{
			if(item.checked){
				if(type == 'classType'){					
					this.filterToApply.classType.push(item.findValue);
				}
			}
		});	
		this.airlines.map((item) =>{
			if(item.checked){
				if(type == 'airLine'){					
					this.filterToApply.airlines.push(item.findValue);
				}
			}
		});		
  	}

	toggleClassType(item) {	
		this.filterToApply.classType =[];
		item.checked = !item.checked;
		this.applyFliter('classType');
		this.refreshData();		
	}
	toggleAirLine(item) {	
		item.checked = !item.checked;		
		this.filterToApply.airlines =[];
		this.applyFliter('airLine');
		this.refreshData();		
	}
	booking(){
		alert("Booking Done!!!")
	}
	openFlightsDetails(data){
		this.popupFlight = data;
		this.displayStyle = "block";
	}  
	getAirlinesList(){	
		this.flightList = this.commonService.getFilterList().subscribe(data=>{
			this.filtersData = data;      
		});
	}
	ngOnInit(): void {
		this.activatedroute.queryParams.subscribe(params => {
			this.inputRequest = params;        
		});	
	}  
  	onSortByValue(filters){	
		this.filterToApply.sortBy = filters;		
		switch (filters) {		
			case 'pricelow':
				this.flightList = this.flightList.sort((a,b)=>a.price -b.price);
				break;		
			case 'pricehigh':
				this.flightList = this.flightList.sort((a,b)=>b.price - a.price);
				break;		
			case 'durationlow':
				this.flightList = this.flightList.sort((a,b)=>a.duration - b.duration);
				break;		
			case 'durationhigh':
				this.flightList = this.flightList.sort((a,b)=>b.duration - a.duration);
				break;		
			case 'airlinea':
				this.flightList = this.flightList.sort((a,b)=>{
					if(b.airline < a.airline){
						return 1;
					} else{
						return -1;
					}
				});
				break;		
			case 'airlinez':
				this.flightList = this.flightList.sort((a,b)=>{
					if(b.airline > a.airline){
						return 1;
					} else{
						return -1;
					}
				});
				break;		
		}    
  }
	checkValue(checkValue){
		this.flightList = this.flightList.filter(item=>{
			if(item.class_type == checkValue){
				return item;
			}
		});
	}
	back(){
		this.router.navigate(['/home/flights'])
	}
	refreshData(){
		console.log(JSON.stringify(this.filterToApply.classType));
		this.flightList = this.originalData.filter(item=>{
			return this.filterToApply.classType.includes(item.class_type) && 
			this.filterToApply.airlines.includes(item.airline) &&
			item.price <= this.filterToApply.Price
		});	
	}

  	getFlightDetails(){ 
		let sample = [];
		var grades = {};  
		var priceSide = [];
		this.commonService.getFlightList().subscribe(data=>{
        this.flightList = data.filter(item => {
            if(item.departure_airport === this.inputRequest.departureLocation && 
              item.arrival_airport === this.inputRequest.arrivalLocation
             // item.seats_available > 0 &&
              //item.class_type === this.inputRequest.classType
			 ){
				
			if(!grades[item.airline]){
				grades[item.airline] = true;
				sample.push({name:item.airline, findValue:item.airline, checked:true,image:item.image});
			} 
			priceSide.push(item.price);										
              return item;
            }       
        });
		if(priceSide.length > 0){
			this.priceSlider.min = Math.min(...priceSide);
			this.priceSlider.max = Math.max(...priceSide);
			this.filterToApply.Price = this.priceSlider.max;
		}
		this.airlines = [...new Set(sample)];
		this.originalData = this.flightList;
		this.initFilter();
		this.onSortByValue('pricelow');
		this.dataLoaded = true;
    });
  }  
}

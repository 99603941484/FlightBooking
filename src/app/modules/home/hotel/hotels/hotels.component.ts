import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  flightForm!: FormGroup;
  tripType: string = 'roundTrip';
  displayModal:boolean = false;
  airportList:any = [];
  constructor( private fb: FormBuilder,private router: Router,
    private commonService:CommonService) { 
    this.createForm()
  }



  ngOnInit(): void {
    this.getAirportList();
  }
  getAirportList() {
   this.airportList = this.commonService.getAirportList().subscribe(data=>{
    this.airportList = data;

   });
 
    
   console.log(this.airportList);
  }
  createForm(){
    this.flightForm = this.fb.group({
      hotelType: ['Ac Rooms', Validators.required],    
      departureLocation: ['Pune', Validators.required],     
      departureDate: ['', Validators.required],      
      passengers: [1, [Validators.required, Validators.min(1)]],
      child: []
    });
    this.onTripTypeChange();
  }
  onTripTypeChange(): void {
    this.flightForm.get('tripType')?.valueChanges.subscribe(value => {
      this.tripType = value;
      if (value === 'oneWay') {
        this.flightForm.get('returnDate')?.clearValidators();
      } else {
        this.flightForm.get('returnDate')?.setValidators(Validators.required);
      }
      this.flightForm.get('returnDate')?.updateValueAndValidity();
    });
  }
  onSubmit(): void {    
    if (this.flightForm.valid) {
        this.router.navigate(['home/search-list'],{queryParams:this.flightForm.value});
      
    }
  }
  go(): void {
    this.router.navigate(['home/search-list']);
  }

  onReset(): void {
    this.flightForm.reset({ tripType: 'roundTrip', passengers: 1 });
    this.tripType = 'roundTrip';
  }

}

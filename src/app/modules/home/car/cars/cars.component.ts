import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  carsForm!: FormGroup;
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
    this.carsForm = this.fb.group({
      carType: ['Car', Validators.required],    
      carLocation: ['Pune', Validators.required],      
      departureDate: ['', Validators.required],     
      passengers: [1, [Validators.required, Validators.min(1)]],      
    });
    this.onTripTypeChange();
  }
  onTripTypeChange(): void {
    this.carsForm.get('tripType')?.valueChanges.subscribe(value => {
      this.tripType = value;
      if (value === 'oneWay') {
        this.carsForm.get('returnDate')?.clearValidators();
      } else {
        this.carsForm.get('returnDate')?.setValidators(Validators.required);
      }
      this.carsForm.get('returnDate')?.updateValueAndValidity();
    });
  }
  onSubmit(): void {    
    if (this.carsForm.valid) {
        this.router.navigate(['home/search-list'],{queryParams:this.carsForm.value});
      
    }
  }
  go(): void {
    this.router.navigate(['home/search-list']);
  }

  onReset(): void {
    this.carsForm.reset({ tripType: 'roundTrip', passengers: 1 });
    this.tripType = 'roundTrip';
  }

}

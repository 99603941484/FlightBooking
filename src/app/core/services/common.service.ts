import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getAirportList():Observable<any>{
    return this.http.get("http://localhost:3000/airport");
  }
  getFlightList():Observable<any>{
    return this.http.get("http://localhost:3000/flights");
  }
  getairlinesList():Observable<any>{
    return this.http.get("http://localhost:3000/airlines");
  }
  getFilterList():Observable<any>{
    return this.http.get("http://localhost:3000/sortBy");
  }
}

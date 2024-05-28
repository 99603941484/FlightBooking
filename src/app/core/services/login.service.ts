import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	isAuthenticated = false;
	constructor(private http_:HttpClient) { }

	login(){		
		return this.http_.get("http://localhost:3000/userDetails");
	}

	
	isAuthenticatedUser(): boolean {
		return this.isAuthenticated;
	}

	logout(): void {
		localStorage.removeItem('authTokan');
		localStorage.removeItem('session');
		localStorage.removeItem('userName');
		this.isAuthenticated = false;
	}
}

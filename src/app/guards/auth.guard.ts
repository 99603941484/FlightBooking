import { Injectable } from '@angular/core';
import {  CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../core/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private loginService: LoginService, private router: Router) {}

	canActivate(): boolean {
		return this.checkAuth();
	}
	canLoad():boolean{
		return this.checkAuth();
	}

	private checkAuth(): boolean {
		if (this.loginService.isAuthenticatedUser()) {
		  return true;
		} else {		 
		  this.router.navigate(['/login']);
		  return false;
		}
	  }
  
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './core/services/login.service';

@Injectable()
export class HeaderSetInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const authToken = localStorage.getItem('authTokan');
    if(authToken !=undefined){
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return next.handle(authReq);
    } else {
      this.loginService.logout();
    }  
    
  }
}

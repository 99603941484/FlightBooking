import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  ifActive:any
  userName:any

  constructor(private loginService_:LoginService,private router_:Router) { }

  ngOnInit(): void {
    this.ifActive=sessionStorage.getItem('session')
    this.userName=sessionStorage.getItem('userName')
  }

  ngDoCheck(){
    this.ifActive = sessionStorage.getItem('session')
    this.userName = sessionStorage.getItem('userName')
  }
  openLoginForm(){
    this.router_.navigate(['/home/login']);
  }

  getUser() {
    const user = sessionStorage.getItem('user')

    if(user !== undefined && user !== null) {
      this.ifActive = JSON.parse(user).session
      this.userName = JSON.parse(user).name
      console.log(this.ifActive,this.userName)
    }
    else {
      this.ifActive="inactive"
      this.userName=''
    }
  }
  logout() {
    sessionStorage.clear()
    this.loginService_.isAuthenticated = false;
    this.router_.navigate(["/"])
  }
}

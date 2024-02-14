import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
model: any = {};
loggedIn:boolean = false;

constructor(private accountService: AccountService) {}

  ngOnInit() {
  this.getCurrentUser();
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => {
        console.log(error);
        this.loggedIn = false;
      }
    })
  }

  logout(){
  this.accountService.logout();
  this.loggedIn = false;
  }

  getCurrentUser(){
  this.accountService.currentUser$.subscribe({
    next: user => {
      this.loggedIn = !!user;
    },
    error: error => console.log(error)
  })
  }
}

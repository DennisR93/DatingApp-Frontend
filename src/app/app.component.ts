import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {UserModel} from "./models/usermodel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor( private accountService: AccountService) {
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;

    const user:UserModel = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}

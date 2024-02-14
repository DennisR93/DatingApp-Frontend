import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
model: any = {};
loggedIn:boolean = false;

constructor(private accountService: AccountService) {}

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
}

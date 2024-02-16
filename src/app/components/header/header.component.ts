import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Observable, of} from "rxjs";
import {UserModel} from "../../models/usermodel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
model: any = {};
/*loggedIn:boolean = false;*/
  // currentUser$ :Observable<UserModel | null> = of(null);

constructor(protected accountService: AccountService, private router: Router) {}

  ngOnInit() {
/*  this.getCurrentUser();*/
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members');
        // this.loggedIn = true;
      },
      error: error => {
        console.log(error);
        this.router.navigateByUrl('/');
        // this.loggedIn = false;
      }
    })
  }

  logout(){
  this.accountService.logout();
  // this.loggedIn = false;
  }

  /*getCurrentUser(){
  this.accountService.currentUser$.subscribe({
    next: user => {
      this.loggedIn = !!user;
    },
    error: error => console.log(error)
  })
  }*/
}

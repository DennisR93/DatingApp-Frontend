import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "./services/account.service";
import {UserModel} from "./models/usermodel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  API_USERS: string = "https://localhost:5001/api/users";
  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;

    const user:UserModel = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get(this.API_USERS).subscribe({
      next: response => {
        this.users = response;
        console.log(response);
      },
      error: err => console.log(err),
      complete: () => console.log("Finished")
    });
  }
}

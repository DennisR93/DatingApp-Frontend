import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  registerMode:boolean = false;
  API_USERS: string = "https://localhost:5001/api/users";
  users: any;

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
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

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}

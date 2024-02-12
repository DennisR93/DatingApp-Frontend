import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users!: any;
  API_USERS: string = "https://localhost:5001/api/users";
  constructor(private htttp: HttpClient) {
  }

  ngOnInit() {
    this.htttp.get(this.API_USERS).subscribe({
      next: response => this.users = response,
      error: err => console.log(err),
      complete: () => console.log("Finished")
    })
  }
}

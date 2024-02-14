import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {UserModel} from "../models/usermodel";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(model:UserModel){
    return this.http.post<UserModel>(this.baseUrl + 'account/login', model).pipe(
      map((response: UserModel) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {UserModel} from "../models/usermodel";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:UserModel){
    return this.http.post<UserModel>(this.baseUrl + 'account/login', model).pipe(
      map((response: UserModel) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: UserModel){
    this.currentUserSource.next(user);
  }
}

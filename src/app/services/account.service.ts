import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map} from "rxjs";
import {UserModel} from "../models/usermodel";
import {environment} from "../../environments/environment.development";
import {PresenceService} from "./presence.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService) { }

  register(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'account/register', model).pipe(
      catchError((error: any) => {
        throw error;
      }),
      map((user: UserModel) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  login(model:UserModel){
    return this.http.post<UserModel>(this.baseUrl + 'account/login', model).pipe(
      map((response: UserModel) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
        return user; //Can be removed if we won't need to see the data in console log!
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  setCurrentUser(user: UserModel){
    user.roles = [];
    const roles = this.getDecodedToke(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  getDecodedToke(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }
}

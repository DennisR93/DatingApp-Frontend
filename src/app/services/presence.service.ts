import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../models/usermodel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl:string = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr:ToastrService) { }

  createHubConnection(user:UserModel){
    this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl + 'presence', {
      accessTokenFactory: () => user.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on("UserIsOnline", username => {
      this.toastr.info(username + ' has connected');
    });

    this.hubConnection.on("UserIsOffline", username => {
      this.toastr.warning(username + ' has disconnected');
    });

    this.hubConnection.on("GetOnlineUsers", usernames => this.onlineUsersSource.next(usernames));
  }

  stopHubConnection(){
    this.hubConnection?.stop().catch(error => console.log(error));
  }
}

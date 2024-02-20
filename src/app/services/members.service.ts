import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberModel} from "../models/membermodel";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl:string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<MemberModel[]>(this.baseUrl + 'users')
  }

  getMember(username: string){
    return this.http.get<MemberModel>(this.baseUrl + 'users/' + username);
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberModel} from "../models/membermodel";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl:string = environment.apiUrl;
members: MemberModel[] = [];
  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<MemberModel[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string){
    const member= this.members.find(u => u.userName === username);
    if(member) return of(member);
    return this.http.get<MemberModel>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: MemberModel){
    return this.http.put(this.baseUrl + 'users', member);
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MemberModel} from "../models/membermodel";
import {map, of} from "rxjs";
import {PaginatedResult} from "../models/pagination";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl:string = environment.apiUrl;
members: MemberModel[] = [];
paginatedResult: PaginatedResult<MemberModel[]> = new PaginatedResult<MemberModel[]>;
  constructor(private http: HttpClient) { }

  getMembers(page?:number, itemsPerPage?: number){
    let params = new HttpParams();

    if(page && itemsPerPage){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    // if(this.members.length > 0) return of(this.members);
    return this.http.get<MemberModel[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        if(response.body) {
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination){
          this.paginatedResult.pagination = JSON.parse(pagination);
        }
        return this.paginatedResult;
      })
    )
  }

  getMember(username: string){
    const member= this.members.find(u => u.userName === username);
    if(member) return of(member);
    return this.http.get<MemberModel>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: MemberModel){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete/photo/' + photoId);
  }
}

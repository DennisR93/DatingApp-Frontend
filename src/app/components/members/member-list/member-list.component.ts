import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {MembersService} from "../../../services/members.service";
import {Observable, take} from "rxjs";
import {Pagination} from "../../../models/pagination";
import {UserParams} from "../../../models/user-params";
import {UserModel} from "../../../models/usermodel";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  // members$: Observable<MemberModel[]> | undefined;
  members: MemberModel[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: UserModel | undefined;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  ngOnInit(){
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    if(!this.userParams) return;

    this.memberService.getMembers(this.userParams).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  resetFilters() {
    if(this.user){
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  pageChanged(event: any){
    if(this.userParams && this.userParams?.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }

}

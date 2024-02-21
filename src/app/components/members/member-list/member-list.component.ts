import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {MembersService} from "../../../services/members.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  members$: Observable<MemberModel[]> | undefined;

  constructor(private memberService: MembersService) { }

  ngOnInit(){
    this.members$ = this.memberService.getMembers();
  }

}

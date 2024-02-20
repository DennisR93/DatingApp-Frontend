import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {UserModel} from "../../../models/usermodel";
import {AccountService} from "../../../services/account.service";
import {MembersService} from "../../../services/members.service";
import {take} from "rxjs";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  member : MemberModel | undefined;
  user: UserModel | null = null;
  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit() {
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

}

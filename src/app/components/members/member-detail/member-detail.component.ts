import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {MembersService} from "../../../services/members.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {SharedModule} from "../../../modules/shared.module";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [
    DatePipe,
    NgIf,
    SharedModule
  ],
  standalone: true
})
export class MemberDetailComponent implements OnInit{
  member: MemberModel | undefined;

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    });
  }
}

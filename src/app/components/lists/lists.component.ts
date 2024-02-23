import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../models/membermodel";
import {MembersService} from "../../services/members.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  members: MemberModel[] = [];
  predicate:string = 'liked';

  constructor(private memberService: MembersService) {
  }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate).subscribe({
      next: response => {
        this.members = response
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {MemberModel} from "../../models/membermodel";
import {MembersService} from "../../services/members.service";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  members: MemberModel[] = [];
  predicate:string = 'liked';
  pageNumber = 1;
  pageSize =5;
  pagination: Pagination | undefined;

  constructor(private memberService: MembersService) {
  }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}

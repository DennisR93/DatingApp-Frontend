import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {UserModel} from "../../../models/usermodel";
import {AccountService} from "../../../services/account.service";
import {MembersService} from "../../../services/members.service";
import {take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member : MemberModel | undefined;
  user: UserModel | null = null;
  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
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

  updateMember(){
    console.log(this.member);
    this.toastr.success("Profile updated successfully");
    this.editForm?.reset(this.member);
  }

}
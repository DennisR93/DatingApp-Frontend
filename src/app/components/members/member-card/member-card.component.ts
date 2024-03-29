import {Component, Input} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {MembersService} from "../../../services/members.service";
import {ToastrService} from "ngx-toastr";
import {PresenceService} from "../../../services/presence.service";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member: MemberModel | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService, protected presenceService: PresenceService) {}

  addLike(member: MemberModel){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success("You have liked " + member.knownAs)
    })
  }
}

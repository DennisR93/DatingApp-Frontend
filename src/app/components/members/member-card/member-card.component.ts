import {Component, Input} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member: MemberModel | undefined;

}

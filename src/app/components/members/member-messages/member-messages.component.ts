import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../models/message";
import {NgForOf, NgIf} from "@angular/common";
import {TimeagoModule} from "ngx-timeago";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [
    TimeagoModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class MemberMessagesComponent{
  @Input() username?: string;
  @Input() messages: Message[] = [];

  constructor() {}

}

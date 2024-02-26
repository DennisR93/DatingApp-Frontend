import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../../models/message";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TimeagoModule} from "ngx-timeago";
import {MessageService} from "../../../services/message.service";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [
    TimeagoModule,
    NgForOf,
    NgIf,
    FormsModule,
    AsyncPipe
  ],
  standalone: true
})
export class MemberMessagesComponent{
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;
  messageContent = '';

  constructor(protected messageService: MessageService) {}

  sendMessage(){
    if(!this.username) return;

    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        // this.messages.push(message);
        // this.messageForm?.reset();
      }
    })
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../models/message";
import {MessageService} from "../../../services/message.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  imports: [
    NgForOf
  ],
  standalone: true
})
export class MemberMessagesComponent implements OnInit{
@Input() username?: string;
messages: Message[] = [];

constructor(private messageService: MessageService) {
}

ngOnInit() {
  this.loadMessages();
}

  loadMessages(){
  if(this.username){
    this.messageService.getMessageThread(this.username).subscribe({
      next: messages => this.messages = messages
    })
  }
}
}

import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message";
import {Pagination} from "../../models/pagination";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  messages?: Message[];
  pagination?: Pagination;
  container:string = "Unread";
  pageNumber:number = 1;
  pageSize:number = 5;

  constructor(private messageService: MessageService) { }

  ngOnInit(){
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }
    })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}

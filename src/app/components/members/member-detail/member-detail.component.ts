import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {MembersService} from "../../../services/members.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {SharedModule} from "../../../modules/shared.module";
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {MemberMessagesComponent} from "../member-messages/member-messages.component";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {MessageService} from "../../../services/message.service";
import {Message} from "../../../models/message";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [
    DatePipe,
    NgIf,
    SharedModule,
    GalleryModule,
    MemberMessagesComponent
  ],
  standalone: true
})
export class MemberDetailComponent implements OnInit{
  @ViewChild('memberTabs') memberTabs?: TabsetComponent;
  member: MemberModel | undefined;
  images: GalleryItem[] =[];
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.loadMember();
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages'){
      this.loadMessages();
    }
  }

  loadMessages(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.getImages();
      }
    });
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}

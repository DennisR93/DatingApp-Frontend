import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {SharedModule} from "../../../modules/shared.module";
import {GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {MemberMessagesComponent} from "../member-messages/member-messages.component";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {MessageService} from "../../../services/message.service";
import {Message} from "../../../models/message";
import {PresenceService} from "../../../services/presence.service";
import {AccountService} from "../../../services/account.service";
import {UserModel} from "../../../models/usermodel";
import {take} from "rxjs";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  imports: [
    DatePipe,
    NgIf,
    SharedModule,
    GalleryModule,
    MemberMessagesComponent,
    AsyncPipe
  ],
  standalone: true
})
export class MemberDetailComponent implements OnInit, OnDestroy{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member!: MemberModel;
  images: GalleryItem[] =[];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user? : UserModel;

  constructor(private route: ActivatedRoute, private messageService: MessageService, protected presenceService: PresenceService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
    }
    })
  }

  ngOnDestroy(): void {
        this.messageService.stopHubConnection();
    }

  ngOnInit() {
   this.route.data.subscribe({
     next: data => this.member = data['member']
   });


    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    });

    this.getImages();
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(t => t.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.user){
      // this.loadMessages();
      this.messageService.createHubConnection(this.user, this.member.userName);
    }
    else{
      this.messageService.stopHubConnection();
    }
  }

  loadMessages(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}

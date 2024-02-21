import {Component, Input, OnInit} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../../environments/environment.development";
import {UserModel} from "../../../models/usermodel";
import {AccountService} from "../../../services/account.service";
import {take} from "rxjs";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
@Input() member: MemberModel | undefined;
uploader: FileUploader | undefined;
hasBaseDropzoneOver = false;
baseUrl = environment.apiUrl;
user: UserModel | undefined;

constructor(private accountService: AccountService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe({
    next: user => {
      if(user) this.user = user
    }
  })
}

ngOnInit(){
  this.initializeUploader();
}

fileOverBase(e: any){
  this.hasBaseDropzoneOver = e;
}

initializeUploader(){
  this.uploader = new FileUploader({
    url: this.baseUrl + 'user/add-photo',
    authToken: "Bearer " + this.user?.token,
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024
  });

  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false
  }

  this.uploader.onSuccessItem = (item, response, status, header) => {
    if(response){
      const photo = JSON.parse(response);
      this.member?.photos.push(photo);
    }
  }
}

}

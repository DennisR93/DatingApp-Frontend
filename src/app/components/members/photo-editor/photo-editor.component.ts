import {Component, Input} from '@angular/core';
import {MemberModel} from "../../../models/membermodel";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {
@Input() member: MemberModel | undefined;

constructor() {}


}

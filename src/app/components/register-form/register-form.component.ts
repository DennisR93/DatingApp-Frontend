import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  @Input() usersFormHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor() {}

  register(){
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}

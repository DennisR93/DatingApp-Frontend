import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) {}

  register(){
   this.accountService.register(this.model).subscribe({
     next: () => {
       this.cancel();
     },
     error: error => console.log(error)
   })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}

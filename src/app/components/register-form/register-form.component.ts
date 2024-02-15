import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  model: any = {};

  constructor() {}

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log("canceled");
  }

}

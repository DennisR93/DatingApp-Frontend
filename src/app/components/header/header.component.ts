import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
model: any = {};

constructor() {}

  login(){
    console.log(this.model);
  }
}

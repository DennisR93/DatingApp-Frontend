import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
model: any = {};

constructor(protected accountService: AccountService, private router: Router) {}

  ngOnInit() {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.model = {};
      }
    });
  }

  logout(){
  this.accountService.logout();
  this.router.navigateByUrl('/');
  }
}

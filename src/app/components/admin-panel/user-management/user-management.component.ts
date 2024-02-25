import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {UserModel} from "../../../models/usermodel";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users: UserModel[] = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}

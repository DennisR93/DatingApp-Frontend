import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup = new FormGroup<any>({});

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    })
  }

  register(){
    console.log(this.registerForm?.value)
  }
  // register(){
  //  this.accountService.register(this.model).subscribe({
  //    next: () => {
  //      this.cancel();
  //    },
  //    error: error => {
  //      console.log(error);
  //      this.toastr.error(error.error);
  //    }
  //  })
  // }

  cancel(){
    this.cancelRegister.emit(false);
  }

}

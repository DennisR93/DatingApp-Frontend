import {UserModel} from "./usermodel";

export class UserParams {
  gender: string;
  minAge:number = 18;
  maxAge:number = 99;
  pageNumber:number = 1;
  pageSize:number = 5;

  constructor(user: UserModel) {
    this.gender = user.gender === "female" ? 'male' : 'female';
  }
}

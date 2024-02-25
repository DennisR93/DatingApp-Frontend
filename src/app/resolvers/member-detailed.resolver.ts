import { ResolveFn } from '@angular/router';
import {MemberModel} from "../models/membermodel";
import {inject} from "@angular/core";
import {MembersService} from "../services/members.service";

export const memberDetailedResolver: ResolveFn<MemberModel> = (route, state) => {
  const memberService = inject(MembersService);

  return memberService.getMember(route.paramMap.get('username')!);
};

import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){
    this.loadRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'triangle-skew-spin',
      bdColor: 'rgba(255,255,255,0',
      color: '#333333'
    })
  }

  idle(){
    this.loadRequestCount--;
    if(this.loadRequestCount <= 0){
      this.loadRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}

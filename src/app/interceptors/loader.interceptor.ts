import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {delay, finalize, identity, Observable} from 'rxjs';
import {LoaderService} from "../services/loader.service";
import {environment} from "../../environments/environment";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.loading();

    return next.handle(request).pipe(
      (environment.production ? identity : delay(1000)),
      finalize(() => {
        this.loaderService.idle()
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class HttpReqInterceptorService implements HttpInterceptor {
  constructor(private authService:AuthService){}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.hasValidToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+this.authService.getAccessToken()
        }
      });
      return next.handle(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.authService.login()
          }
          return throwError(err);
        })
      );
    }

    return next.handle(req);
  }
}
export const httpInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptorService,
      multi: true,
    },
];


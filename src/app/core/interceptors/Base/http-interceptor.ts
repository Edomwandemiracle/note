import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    errorMessage: string;
    constructor(private loaderService: LoaderService, private router: Router, private notification: NotificationsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();

        return next.handle(request).pipe(tap(evt => {
            if (evt instanceof HttpResponse) {
                this.loaderService.hide();
            }
        }),

        catchError((error: HttpErrorResponse) => {
            this.loaderService.hide();
            if (error.status === 401) {
                this.notification.publishMessages('Your Session has expired. Please Login', 'danger', 1);
                localStorage.clear();
                sessionStorage.clear();
                location.reload();
                this.router.navigateByUrl('/auth/login');
            }

            if (error.error instanceof ErrorEvent) {
                this.errorMessage = `Error: ${error.error.message}`;
            } else {
                switch (error.status) {
                    case 500: {
                        this.errorMessage = 'An Internal Server Error Occured.';
                        this.notification.publishMessages(this.errorMessage, 'danger', 1);
                        break;
                    }
                    case 400: {
                        this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
                        if (error.error.error === 'invalid_grant' || 'access_denied') {
                            this.notification.publishMessages(error.error.errorDescription, 'danger', 1);
                        } else {
                            this.notification.publishMessages(this.errorMessage, 'danger', 1);
                        }
                        break;
                    }
                    case 404: {
                        this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
                        this.notification.publishMessages(this.errorMessage, 'danger', 1);
                        break;
                    }
                    case 0: {
                        this.errorMessage = 'A Connection Error Occured. Please Check Your Network Connection';
                        this.notification.publishMessages(this.errorMessage, 'danger', 1);
                        break;
                    }
                }
            }

            if (error.status === 503 || error.status === 0) {
                return throwError(this.errorMessage);
            }

        }));
    }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                return throwError(() => error);
            })
        );
    }
}
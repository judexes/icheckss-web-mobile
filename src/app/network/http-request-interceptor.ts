import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { WorkspaceService } from '../services/workspace.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    user: any;
    workspace: any;

    constructor(
        private authService: AuthenticationService,
        private workspaceService: WorkspaceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: request.headers.set('Cache-Control', 'no-cache').set('Pragma', 'no-cache').set('Expires', '0')
        });

        this.user = this.authService.currentUserValue;
        this.workspace = this.workspaceService.currentWorkspaceValue;

        if (this.user?.token) {
            request = request.clone({ headers: request.headers
                .set('Authorization', 'Bearer ' + this.user.token)});
        }

        if (this.workspace?.id) {
            request = request.clone({ headers: request.headers.set('Workspace-Id', this.workspace.id.toString() )});
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request);
    }
}

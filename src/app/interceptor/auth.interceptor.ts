import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authservice/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private host = environment.backendURL;
    endpointsWithoutAuth: string[] = [
        `${this.host}/user/login`,
        `${this.host}/user/create`
    ]

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if ((!request.url.includes(`${this.host}/user/login`)) || (!request.url.includes(`${this.host}/user/create`))) {
            const authToken = this.authService.getAuthTokenFromCache();
            //if(this.endpointsWithoutAuth[request.url.includes])

            if (authToken !== null) {
                console.log(`interception token = ${authToken}`)
                var authRequest = request.clone({ setHeaders: { Authorization: authToken } });
                return next.handle(authRequest);
            } else {
                return next.handle(request)
            }
        } else {
            return next.handle(request)
        }

    }
}

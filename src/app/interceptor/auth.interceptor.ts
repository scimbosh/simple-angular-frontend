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

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
        // if (request.url.includes(`${this.host}/todo/list`)) {
		// 	return next.handle(request);
		// }
        
        const authToken = this.authService.getAuthTokenFromCache();
        if (authToken !== null){
            var authRequest = request.clone({ setHeaders: { Authorization: authToken } });
            return next.handle(authRequest);
        }else{
            return next.handle(request)
        }
        
    }
}

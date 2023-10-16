import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    credentials = { username: "", password: "" };
    authenticated = false;

    constructor(private http: HttpClient) {
    }

    authenticate(inputCredentials: any, callback: () => void) {
        var _runtimeCredentials = { username: "", password: "" }
        if (this.authenticated === true) {
            _runtimeCredentials = this.credentials
        } else {
            _runtimeCredentials = inputCredentials
        }

        const headers = new HttpHeaders(_runtimeCredentials ? {
            authorization: 'Basic ' + btoa(_runtimeCredentials.username + ':' + _runtimeCredentials.password)
        } : {});

        this.http.get(environment.backendURL + '/auth/login', { headers: headers }).subscribe((response: any) => {
            if (response['username']) {
                this.authenticated = true;
                this.credentials = _runtimeCredentials
            } else {
                this.authenticated = false;
                this.credentials = { username: "", password: "" }
            }
            return callback && callback();
        });

    }


}

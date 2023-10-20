import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private host = environment.backendURL;

    constructor(private httpClient: HttpClient, private router: Router) { }

    //login(username: string, password: string) {
    login(user: User) {
        const _authToken = 'Basic ' + btoa(user.username + ':' + user.password)
        
        console.log(`username = ${user.username}, password = ${user.password} authToken = ${_authToken}`)

        this.httpClient.get(`${this.host}/auth/login`, {
            headers: {
                'authorization': _authToken
            }
        }).subscribe(
            {
                next: ((response: any) => {
                    console.log('/auth/login response received')
                    console.log(JSON.stringify(response))
                    if (response['name']) {
                        console.log('save authToken')
                        sessionStorage.setItem('authToken', _authToken);
                        console.log('redirect')
                        this.router.navigate(['/todo'])
                    } else {
                        console.log('username not found')
                    }
                }),

                error: (error => {
                    console.log(error);
                })
            }
        )
    }

    getAuthTokenFromCache(): string | null {
        console.log('Get token from session storage')
        var token = sessionStorage.getItem('authToken');
        console.log(JSON.stringify(token));
        return token;
    }


}

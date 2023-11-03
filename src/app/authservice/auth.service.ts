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

    login(user: User) {
        const _authToken = 'Basic ' + btoa(user.username + ':' + user.password)
        this.httpClient.get(`${this.host}/user/login`, {
            headers: {
                'authorization': _authToken
            }
        }).subscribe(
            {
                next: ((response: any) => {
                    if (response['name']) {
                        sessionStorage.setItem('authToken', _authToken);
                        this.router.navigate(['/todo'])
                    } else {
                        console.error('username not found')
                    }
                }),

                error: (error => {
                    console.error(error);
                })
            }
        )
    }

    getAuthTokenFromCache(): string | null {
        var token = sessionStorage.getItem('authToken');
        return token;
    }


}

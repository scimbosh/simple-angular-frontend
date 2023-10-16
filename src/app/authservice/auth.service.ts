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

    login(username: string, password: string) {
        const _authToken = 'Basic ' + btoa(username + ':' + password)
        
        console.log(`username = ${username}, password = ${password} authToken = ${_authToken}`)

        this.httpClient.get(`${this.host}/auth/login`, {
            headers: {
                'authorization': _authToken
            }
        }).subscribe(
            {
                next: ((response: any) => {
                    console.log('response received')
                    console.log(JSON.stringify(response))
                    if (response['name']) {
                        console.log('save authToken')
                        sessionStorage.setItem('authToken', _authToken);
                        console.log('redirect to /data')
                        this.router.navigate(['/data'])
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
        return sessionStorage.getItem('authToken');
    }


}

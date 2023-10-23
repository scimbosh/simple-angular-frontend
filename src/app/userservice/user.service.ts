import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private host = environment.backendURL;

    constructor(private httpClient: HttpClient) { }

    createUser(user: User): Observable<User | HttpErrorResponse>{
        return this.httpClient.post<User | HttpErrorResponse>(`${this.host}/user/create`, user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getRoles(): Observable<User | HttpErrorResponse>{
        return this.httpClient.get<User | HttpErrorResponse>(`${this.host}/user/create`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username = "";
    password = "";
    user: User = { 
        id: undefined, 
        username: this.username, 
        password: this.password, 
        roles: undefined 
    }

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {}

    login() {
        this.authService.login(this.user);
    }
}



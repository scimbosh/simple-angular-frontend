import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username = "";
    password = "";
    //private user =  new User();

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {

    }

    login() {      
        //this.user = {username: this.username, password: this.password }
        this.authService.login(this.username, this.password);
    }
}



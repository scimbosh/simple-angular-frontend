import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    user: User = { 
        id: undefined, 
        username: undefined, 
        password: undefined, 
        roles: undefined 
    }

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {}

    login() {
        console.log(this.user.username, this.user.password)
        this.authService.login(this.user);
    }

    goToRegistration(){
        this.router.navigate(['/registration'])
    }
}



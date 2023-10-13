import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/appservice/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval, take, firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username = "";
    password = "";
    credentials = { username: this.username, password: this.password };

    constructor(private app: AppService, private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {

    }


    login() {
        this.app.authenticate(this.credentials, () => {
            this.router.navigate(['/todo']);
        })
    }

}

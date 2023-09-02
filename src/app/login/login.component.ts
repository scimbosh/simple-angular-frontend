import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval, take, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = "";
  password = "";
  token = "";
  errorFlag = false

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  openDataPage() {
    const data = {
      login: this.login,
      password: this.password,
    };
    const body = JSON.stringify(data)

    this.httpClient.post<any>(environment.backendURL + "/login/signin",
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).subscribe(
      {

        next: ((response: any) => {
          console.log(response)
          this.token = response.token
          this.errorFlag = false

          if (this.token !== "") {
            this.router.navigate(['/data'], {
              queryParams: {
                login: this.login,
                password: this.password,
                token: this.token
              }
            })

          } else {
            this.errorFlag = true
          }

        }),

        error: (error => {
          this.errorFlag = true
          console.log(error);
        })
      }
    );






  }

}

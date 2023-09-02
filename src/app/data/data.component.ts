import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  login = "";
  password = "";
  token = "";
  userSecretData = "";
  errorFlag = false


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.login = params['login']
      this.password = params['password']
      this.token = params['token']
    });
  }

  getSecretData(): void {
    const data = {
      login: this.login,
      password: this.password,
      token: this.token
    };
    const body = JSON.stringify(data)

    this.httpClient.post<any>(environment.backendURL + "/data",
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).subscribe(
      {

        next: ((response: any) => {
          console.log(response);
          this.userSecretData = response.secret;
          this.errorFlag = false;
        }),

        error: (error => {
          this.errorFlag = true;
          console.log(error);         
        })
      }
    );

  };

  logout() {
    this.router.navigate(['/logout']);
  }

}

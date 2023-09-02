import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-sandbox',
  templateUrl: './test-sandbox.component.html',
  styleUrls: ['./test-sandbox.component.css']
})
export class TestSandboxComponent implements OnInit{
  name = "default value";
  disabled = false;

  constructor(private httpClient: HttpClient) {
    this.name = "constructor value"
  }

  ngOnInit(): void {
    console.log("dataComponent")
    this.name = "ngOnInit value"
    this.httpClient.get<any>(environment.backendURL + "/hc/1").subscribe(
      {
        next: ((response: any) => {
          
          console.log(response);
          console.log(response.id);
          console.log(response.request);
        }),

        error: (error => {
          console.log(error);
        })
      }
    );

    const data = {
      login: "loginw18",
      password: "password1"
    };
    const body = JSON.stringify(data);

    this.httpClient.post<any>(environment.backendURL + "/login/signin", body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({

      next: ((response: any) => {
        console.log(response);
      }),

      error: (error => {
        console.log(error);
      })
    });

  }

  changeName(): void{
    this.name = uuid.v4();
  }

  changeDisabled(): void {
    this.disabled = ! this.disabled
  }
}

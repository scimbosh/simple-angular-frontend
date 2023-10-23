import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from '../userservice/user.service';
import { FormControl, Validators } from '@angular/forms';


interface Animal {
    name: string;
    sound: string;
  }

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']

})
export class RegistrationComponent {


    animalControl = new FormControl<Animal | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);
    animals: Animal[] = [
      {name: 'Dog', sound: 'Woof!'},
      {name: 'Cat', sound: 'Meow!'},
      {name: 'Cow', sound: 'Moo!'},
      {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
    ];

    isUserCreated: boolean = false;
    errorIntercepted: boolean;
    roles: string[] = [
        'test1',
        'test2'
    ];

    user: User = {
        id: undefined,
        username: undefined,
        password: undefined,
        roles: undefined
    }

    ngOnInit(): void { }

    constructor(private userService: UserService, private http: HttpClient, private router: Router) {
        this.errorIntercepted = false
        this.getRoles()
    }

    getRoles(){
        console.log("getRole")
        this.userService.getRoles().subscribe({
            next: (response: any) => {    
                console.log(`getRoles = ${JSON.stringify(response)}`)
                this.roles = response;
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.roles = [];
            }
        })
    }

    createUser() {
        console.log(this.user);
        this.userService.createUser(this.user).subscribe({
            next: (response: any) => {
                console.log('response = ' + JSON.stringify(response))
                if (response['username']) {
                    this.isUserCreated = true;
                    this.errorIntercepted = false;
                    console.log('redirect to /login')
                    this.router.navigate(['/login'])
                } else {
                    this.isUserCreated = false;
                    this.errorIntercepted = true;
                }
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.isUserCreated = false;
                this.errorIntercepted = true;
                this.user.username = undefined;
                this.user.password = undefined;
            }
        })
    }

}

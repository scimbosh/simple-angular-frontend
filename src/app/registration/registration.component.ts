import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { Role } from 'src/app/model/role/role';
import { UserService } from '../userservice/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']

})

export class RegistrationComponent {

    roleControl = new FormControl<Role[] | null>(null, Validators.required);
    isUserCreated: boolean = false;
    errorIntercepted: boolean;
    roles: Role[] = [];

    user: User = {
        id: undefined,
        username: undefined,
        password: undefined,
        roles: undefined
    }

    ngOnInit(): void { }

    constructor(private userService: UserService, private router: Router) {
        this.errorIntercepted = false
        this.getRoles()
    }

    getRoles() {
        console.log("getRole")
        this.userService.getRoles().subscribe({
            next: (response: any) => {
                console.log(`Get roles result = ${JSON.stringify(response)}`)

                this.roles = response.map((item: string) => {
                    var tempRole: Role = {
                        name: item?.toString(),
                        localizationText: item.replace("ROLE_", '')
                    };
                    return tempRole;
                });
            },

            error: (errorResponse: HttpErrorResponse) => {
                console.error("Get roles - Response processing error")
                this.roles = [];
            }
        })
    }


    createUser() {
        this.user.roles = this.roleControl.value?.map((item: any) => item.name.toString())
        console.log('create user' + this.user);
        this.userService.createUser(this.user).subscribe({
            next: (response: any) => {
                console.log('Create user response = ' + JSON.stringify(response))
                if (response['username']) {
                    this.isUserCreated = true;
                    this.errorIntercepted = false;
                    console.log('Redirect to /login')
                    this.router.navigate(['/login'])
                } else {
                    console.error("Сreate user - Unhandled error")
                    this.isUserCreated = false;
                    this.errorIntercepted = true;
                }
            },

            error: (errorResponse: HttpErrorResponse) => {
                console.error("Create user - Response processing error")
                this.isUserCreated = false;
                this.errorIntercepted = true;
                this.user.username = undefined;
                this.user.password = undefined;
            }
        })
    }

}

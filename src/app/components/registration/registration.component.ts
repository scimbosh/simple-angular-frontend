import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { Role } from 'src/app/model/role/role';
import { UserService } from '../../services/userservice/user.service';
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
        this.userService.getRoles().subscribe({
            next: (response: any) => {
                this.roles = response.map((item: string) => {
                    var tempRole: Role = {
                        name: item?.toString(),
                        localizationText: item.replace("ROLE_", '')
                    };
                    return tempRole;
                });
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.roles = [];
            }
        })
    }

    createUser() {
        this.user.roles = this.roleControl.value?.map((item: any) => item.name.toString())
        this.userService.createUser(this.user).subscribe({
            next: (response: any) => {
                if (response['username']) {
                    this.isUserCreated = true;
                    this.errorIntercepted = false;
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

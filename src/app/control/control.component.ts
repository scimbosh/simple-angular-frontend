import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { Role } from 'src/app/model/role/role';
import { UserService } from 'src/app/userservice/user.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent {

    roleControl = new FormControl<Role[] | null>(null, Validators.required);
    roles: Role[] = [];
    isPasswordHide = true;
    errorFlag: boolean = false
    users: User[] = [];
    user: User = {
        id: undefined,
        username: undefined,
        password: undefined,
        roles: undefined
    }

    ngOnInit(): void {
        this.getRoles()
        this.getUsers()
    }

    constructor(private userService: UserService, private router: Router) {
    }

    getUsers() {
        this.userService.getUsers().subscribe({
            next: (response: any) => {
                this.users = response.sort((a: any, b: any) => a.id - b.id)
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.errorFlag = true
            }
        })
    }

    updateUser(user: User) {
        if (user !== null) {
            this.userService.updateUser(user!!).subscribe({
                next: (response: any) => {
                    this.getUsers()
                },
                error: (errorResponse: HttpErrorResponse) => {
                    this.errorFlag = true
                    this.getUsers()
                }
            })

        } else {
            console.error("User is null")
        }
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

    deleteUser(user: User) {
        this.userService.deleteUser(user).subscribe({
            next: (response: any) => {
                this.getUsers()
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.roles = [];
            }
        })
    }


}

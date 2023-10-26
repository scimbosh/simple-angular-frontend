import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { Role } from 'src/app/model/role/role';
import { UserService } from '../userservice/user.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent {

    errorFlag: boolean = false
    users: User[] =[];
    user: User = {
        id: undefined,
        username: undefined,
        password: undefined,
        roles: undefined
    }

    ngOnInit(): void { }

    constructor(private userService: UserService, private router: Router) {
    }

    getUsers(){
        this.userService.getUsers().subscribe({
            next: (response: any) => {
                this.users = response
            },

            error: (errorResponse: HttpErrorResponse) => {
                console.error("Update user - Response processing error")
                this.errorFlag = true
            }
        })
    }

    updateUser(){
        this.userService.updateUser(this.user).subscribe({
            next: (response: any) => {

            },

            error: (errorResponse: HttpErrorResponse) => {
                console.error("Update user - Response processing error")
                this.errorFlag = true
            }
        })
    }

    deleteUser(){}







}

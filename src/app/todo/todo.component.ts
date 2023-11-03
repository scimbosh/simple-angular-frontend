import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/note/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/todoservice/todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    private host = environment.backendURL;
    todo: Todo = {
        id: undefined,
        content: undefined,
        checked: false
    }
    toDoList: Todo[] = []

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private todoService: TodoService
    ) { }

    ngOnInit() { this.getToDoList() }

    getToDoList() {
        this.todoService.getToDoList().subscribe({
            next: ((response: any) => {
                this.toDoList = response.sort((a: any, b: any) => a.id - b.id)
            })
        })
    }

    createTodo() {
        this.todoService.createToDo(this.todo).subscribe({
            next: ((response: any) => {
                this.getToDoList()
            }),
            error: (error => {
                this.getToDoList()
            })
        })
    }

    updateCheckbox(todo: Todo) {
        todo.checked = !todo.checked
        this.todoService.updateToDo(todo).subscribe({
            next: ((response: any) => {
                this.getToDoList()
            }),
            error: (error => {
                todo.checked = !todo.checked
                this.getToDoList()
            })
        })
    }

    deleteTodo(todo: Todo) {
        this.httpClient.delete(`${this.host}/todo`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: todo
        }).subscribe({
            next: ((response: any) => {
                console.log("parse response /todo/delete ")
                console.log(`response.status = ${response.status} `)
                console.log(JSON.stringify(response))

                const indexOfObject = this.toDoList.findIndex((item) => {
                    return item.id === todo.id;
                });

                console.log(indexOfObject);

                if (indexOfObject !== -1) {
                    this.toDoList.splice(indexOfObject, 1);
                }
                this.getToDoList()
            })
        })
    }



    deleteSelected() {
        for (var todo of this.toDoList) {
            if (todo.checked === true) {
                this.deleteTodo(todo)
            }
        }
    }



    goToUserList() {
        this.router.navigate(['/control'])
    }

}

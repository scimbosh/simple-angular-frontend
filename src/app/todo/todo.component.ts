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
    content = "";
    checked = false;
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
        var injectTodo: Todo = new Todo;
        injectTodo.content = this.content
        injectTodo.checked = this.checked

        this.httpClient.post(`${this.host}/todo/add`,
            injectTodo,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).subscribe({
            next: ((response: any) => {
                console.log('parse response /todo/add')
                console.log(JSON.stringify(response))
                this.getToDoList()

            }),
            error: (error => {
                console.log('Error after /todo/add');
                console.log(error);
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

    updateCheckbox(todo: Todo) {
        todo.checked = !todo.checked
        this.httpClient.patch<Todo>(`${this.host}/todo`, todo, { headers: { 'Content-Type': 'application/json' } })
            .subscribe({
                next: ((response: any) => {
                    console.log('parse response PATCH /todo')
                    console.log(JSON.stringify(response))
                    this.getToDoList()
                }),
                error: (error => {
                    console.log('Error after PATCH /todo');
                    console.log(error);
                    todo.checked = !todo.checked
                    this.getToDoList()
                })
            }
            )
    }

    goToUserList() {
        this.router.navigate(['/control'])
    }

}

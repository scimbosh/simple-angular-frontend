import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { Note } from 'src/app/model/note/note';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    private host = environment.backendURL;
    content = "";
    checked = false;
    toDoList: Note[] = []

    constructor(private httpClient: HttpClient) { }

    ngOnInit() { this.getToDoList() }

    createTodo() {
        var injectTodo : Note = new Note;
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
            })
        })
    }

    getToDoList() {
        this.httpClient.get<Note[]>(`${this.host}/todo/list`).subscribe({
            next: ((response: any) => {
                console.log('/todo/list response received')
                console.log(JSON.stringify(response))
                console.log('map response')
                this.toDoList = response
                console.log(JSON.stringify(this.toDoList[0].id))
            })
        })
    }

    deleteTodo(todo: Note) {
        this.httpClient.delete(`${this.host}/todo/delete`, {
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
            })
        })
    }

    deleteSelected(){
        for(var todo of this.toDoList) {
            if (todo.checked === true) {
                this.deleteTodo(todo)
            }
        }
    }


    test() {
        this.httpClient.get(`${this.host}/todo/list`).subscribe({
            next: ((response: any) => {
                console.log('/todo/list response received')
                console.log(JSON.stringify(response))

            })
        })
    }



}

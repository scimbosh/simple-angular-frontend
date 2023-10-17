import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    todos: Todo[] = [];
    newTodo = new Todo();
    private host = environment.backendURL;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() { }


    getTodoList(){
        this.httpClient.get(`${this.host}/todo/list`).subscribe({
            next: ((response: any) => {
                console.log('/auth/login response received')
                console.log(JSON.stringify(response))
                
            })
        })
    }

    createTodo() {
        this.newTodo = new Todo();
        //this.httpClient.post
    }

    addTodo() {
        this.httpClient.post
        this.todos.push(this.newTodo);
        this.newTodo = new Todo();
    }

    deleteTodo(index: number) {
        this.todos.splice(index, 1);
    }

    deleteSelected() {
        // this.todos.forEach((value, index, object) => {
        //   if (value.status === true) {
        //     this.todos.splice(index, 1)
        //   }
        // });

        this.todos = this.todos.filter((todo) => !todo.status);

    }

}

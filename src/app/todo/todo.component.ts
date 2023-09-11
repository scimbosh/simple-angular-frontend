import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = new Todo();

  addTodo() {
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

  constructor() { }

  ngOnInit() { }

}

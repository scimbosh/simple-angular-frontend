import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  tasks: any[] = [];

  createTask(text: string) {
    return {
      id: this.tasks.length,
      text,
      completed: false,
      deleted: false
    };
  }

  addTask(task: string) {
    const newTask = this.createTask(task);
    this.tasks.push(newTask);
  };

  deleteTask(id: number){
    console.log("deleteTask")
    const i = this.tasks.findIndex((t) => t.id === id);
    this.tasks[i];
    this.tasks.splice(i, 1);

    // for( var i = 0; i < this.tasks.length; i++){ 
    //   if ( this.tasks[i].id === task.id) { 
    //     console.log(this.tasks[i].id)
    //     console.log(task.id)
    //     this.tasks.splice(i, 1); 
    //   } 
    // }
  }


  
  completed(id: number) {
    const i = this.tasks.findIndex((t) => t.id === id);
    this.tasks[i].completed = !this.tasks[i].completed;
  };
}

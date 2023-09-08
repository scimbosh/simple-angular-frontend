import { Component } from '@angular/core';

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
    };
  }

  addTask(task: string) {
    const newTask = this.createTask(task);
    this.tasks.push(newTask);
  };

  completed(id: number) {
    const i = this.tasks.findIndex((t) => t.id === id);
    this.tasks[i].completed = !this.tasks[i].completed;
  };
}

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: any = {};
  @Output() completed = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();


  clickDelete() {
    this.deleteTask.emit(this.task)
  }

  //@Input() tasks: any = [];
  //@Output() deleteTask() = new EventEmitter<any>();



}
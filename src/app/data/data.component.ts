import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{

  name = "default value";
  disabled = false;

  constructor() {
    this.name = "constructor value"
  }

  ngOnInit(): void{
    this.name = "ngOnInit value"
  }

  changeName(): void{
    this.name = uuid.v4();
  }

  changeDisabled(): void {
    this.disabled = ! this.disabled
  }
}

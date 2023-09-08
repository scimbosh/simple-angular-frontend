import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { TestSandboxComponent } from './test-sandbox/test-sandbox.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    TestSandboxComponent,
    LoginComponent,
    TaskComponent,
    TasksComponent,
    CreateTaskComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

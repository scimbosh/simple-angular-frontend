import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { TestSandboxComponent } from './test-sandbox/test-sandbox.component';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

//mapping address and component
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'data', component: DataComponent},
  {path: 'test', component: TestSandboxComponent},
  {path: 'todo', component: TodoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

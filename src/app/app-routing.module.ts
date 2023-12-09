import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ControlComponent } from './components/control/control.component';

//mapping address and component
const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'todo', component: TodoComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'control', component: ControlComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

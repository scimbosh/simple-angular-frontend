import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { ControlComponent } from './control/control.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TodoComponent,
        RegistrationComponent,
        ControlComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

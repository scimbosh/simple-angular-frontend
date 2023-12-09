import { Injectable } from '@angular/core';
import { Todo } from 'src/app/model/note/todo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private host = environment.backendURL;

    constructor(private httpClient: HttpClient) { }

    getToDoList(): Observable<Todo[] | HttpErrorResponse> {
        return this.httpClient.get<Todo[]>(`${this.host}/todo/list`)
    }

    createToDo(todo: Todo): Observable<Todo | HttpErrorResponse> {
        return this.httpClient.post<Todo>(`${this.host}/todo/add`,
            todo,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    updateToDo(todo: Todo): Observable<Todo | HttpErrorResponse> {
        return this.httpClient.patch<Todo>(`${this.host}/todo`,
            todo,
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    deleteToDo(todo: Todo): Observable<Todo | HttpErrorResponse> {
        return this.httpClient.delete<Todo | HttpErrorResponse>(`${this.host}/todo`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: todo
        })
    }


}

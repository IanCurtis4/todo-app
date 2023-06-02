import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly API_URL = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.API_URL);
  }

  createTodoItem(item: TodoItem) {
    return this.http.post<TodoItem>(this.API_URL, item);
  }

  updateTodoItem(item: TodoItem) {
    return this.http.put(`${this.API_URL}/${item.id}`, item);
  }

  deleteTodoItem(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}

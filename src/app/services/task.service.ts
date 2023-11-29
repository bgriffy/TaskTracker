import { Injectable } from '@angular/core';
import { TASKS } from '../mock-tasks';
import { Task } from '../Task'; 
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root', 
})

export class TaskService {
  private apiUrl :string = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  getTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask (task: Task): Observable<Task>{
    const deletionUrl = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(deletionUrl);
  }

  updateTask (task: Task): Observable<Task>{
    const updateUrl = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(updateUrl, task, httpOptions);
  }

  addTask (task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
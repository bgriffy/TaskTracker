import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../Task';
import { TASKS } from '../..//mock-tasks';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from "../add-task/add-task.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [CommonModule, TaskItemComponent, AddTaskComponent, HeaderComponent]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task): void{
    this.taskService.deleteTask(task).subscribe(() => {this.tasks = this.tasks.filter(t => t.id !== task.id)});
  }

  toggleTaskReminder(task: Task): void{
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe(() => {console.log(`toggled reminder on task ${task.id}`)});
  }

  addTask(task: Task): void{
    this.taskService.addTask(task).subscribe((newTask) => {this.tasks.push(newTask)});
  }
}

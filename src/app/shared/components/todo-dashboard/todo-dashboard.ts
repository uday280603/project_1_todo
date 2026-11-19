import { Component } from '@angular/core';
import { Todo } from '../todo/todo';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  imports: [Todo, TodoForm],
  selector: 'app-todo-dashboard',
  styleUrl: './todo-dashboard.scss',
  templateUrl: './todo-dashboard.html',
})
export class TodoDashboard {}

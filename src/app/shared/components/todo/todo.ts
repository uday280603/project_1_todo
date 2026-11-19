import { Component, inject } from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { Itodo } from '../../model/Itodo';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [],
  selector: 'app-todo',
  styleUrl: './todo.scss',
  templateUrl: './todo.html',
})
export class Todo {
  private readonly _todoService = inject(TodoService);
  private readonly _snackbar = inject(SnackbarService);

  todoData = this._todoService.todos;

  onEditTodo(todo: Itodo) {
    this._todoService.emitEdit(todo);
  }

  onRemoveTodo(id: number) {
    this._todoService.onRemoveTodo(id).subscribe({
      next: (data) => {
        this._snackbar.openSnackbar(data.msg);
      },
      error: (err) => {
        this._snackbar.openSnackbar(err);
      },
    });
  }
}

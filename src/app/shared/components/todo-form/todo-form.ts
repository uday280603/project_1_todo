import { Component, signal } from '@angular/core';
import { Itodo } from '../../model/Itodo';
import { form, FormField } from '@angular/forms/signals';
import { TodoService } from '../../service/todo-service';
import { SnackbarService } from '../../service/snackbar-service';
import { Todo } from '../todo/todo';

@Component({
  imports: [FormField],
  selector: 'app-todo-form',
  styleUrl: './todo-form.scss',
  templateUrl: './todo-form.html',
})
export class TodoForm {
  constructor(
    private _todoService: TodoService,
    private _snackbar: SnackbarService,
  ) {
    this.editObj();
  }
  editedObj!: Itodo;

  isInEditMode: boolean = false;
  todoModel = signal<Itodo>({
    todoId: 0,
    todoItem: '',
    isCompleted: true,
  });

  todoForm = form(this.todoModel);

  onAddTodo(event: Event) {
    event.preventDefault();

    let NEW_OBJ: Itodo = {
      ...this.todoModel(),
      todoId: Date.now(),
    };

    this._todoService.addTodo(NEW_OBJ).subscribe({
      next: (data) => {
        this._snackbar.openSnackbar(data.msg);
        this.todoModel.set({
          todoId: 0,
          todoItem: '',
          isCompleted: true,
        });
      },
      error: (err) => {
        this._snackbar.openSnackbar(err);
      },
    });
  }

  editObj() {
    this._todoService.emitObj$.subscribe({
      next: (data) => {
        this.editedObj = data;
        this.todoModel.set({ ...data });
        this.isInEditMode = true;
      },
    });
  }

  onUpdateTodo() {
    let UPDATED_OBJ = {
      ...this.todoModel(),
      todoId: this.editedObj.todoId,
    };
    this._todoService.updateTodo(UPDATED_OBJ).subscribe({
      next: (data) => {
        this._snackbar.openSnackbar(data.msg);
        this.todoModel.set({
          todoId: 0,
          todoItem: '',
          isCompleted: true,
        });
        this.isInEditMode = false;
      },
      error: (err) => {
        this._snackbar.openSnackbar(err);
      },
    });
  }
}

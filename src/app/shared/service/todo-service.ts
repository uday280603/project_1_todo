import { Service, signal } from '@angular/core';
import { Itodo } from '../model/Itodo';
import { Observable, of, Subject } from 'rxjs';
import { Ires } from '../model/Ires';

@Service()
export class TodoService {
  todoArr: Itodo[] = [
    {
      todoId: 1,
      todoItem: 'HTML',
      isCompleted: true,
    },
    {
      todoId: 2,
      todoItem: 'CSS',
      isCompleted: false,
    },
  ];

  todos = signal<Itodo[]>(this.todoArr);
  emitObj$ = new Subject<Itodo>();
  emitEditObj: Observable<Itodo> = this.emitObj$.asObservable();

  fetchAll(): Observable<Itodo[]> {
    return of(this.todoArr);
  }
  
  addTodo(todo: Itodo): Observable<Ires<Itodo>> {
    this.todoArr.unshift(todo);
    this.todos.set([...this.todoArr]);
    return of({
      msg: `New todo with id ${todo.todoId} is added into database successfullly..!`,
      data: todo,
    });
  }

  emitEdit(todo: Itodo) {
    this.emitObj$.next(todo);
  }

  updateTodo(todo: Itodo): Observable<Ires<Itodo>> {
    this.todos.update((arr) => arr.map((item) => (item.todoId === todo.todoId ? todo : item)));
    return of({
      msg: `Todo with id ${todo.todoId} updated successfully..!`,
      data: todo,
    });
  }

  onRemoveTodo(removeId: number): Observable<Ires<Itodo>> {
    let GETINDEX = this.todoArr.findIndex((todo) => todo.todoId === removeId);
    let removeItem = this.todoArr.splice(GETINDEX, 1);
    this.todos.set([...this.todoArr]);
    return of({
      msg: `Todo with id ${removeId} is removed successfully...!`,
      data: removeItem[0],
    });
  }
}

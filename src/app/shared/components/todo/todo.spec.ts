import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from '../../service/todo-service';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todo],
    }).compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a todo added after initialization', () => {
    TestBed.inject(TodoService).addTodo({
      todoId: 3,
      todoItem: 'New todo',
      isCompleted: false,
    });

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('New todo');
  });
});

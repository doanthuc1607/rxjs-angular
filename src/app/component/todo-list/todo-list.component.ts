import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todo$:Observable<Todo[]>;

  constructor(private todoService:TodoService) {
    this.todo$ = new Observable<Todo[]>();
   }

  ngOnInit(): void {
    this.todo$ = this.todoService.todo$;
  }

  onChangeTodoStatus(todo:Todo){
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }

}

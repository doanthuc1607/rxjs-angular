import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from './../../models/todo.model';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  isHovered = false;
  isEditing = false;

  //con của todolist
  //sử dụng input truyền dữ liệu từ cha todo-list sang cho con todo-item
  @Input() todo:Todo;
  //output để đẩy dữ liệu từ con sang cha từ todo-item sang todolist
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor() {
    this.todo = new Todo(0, '');
     }

  ngOnInit(): void {

  }
  public changeTodoStatus(){
    //nghĩa là mình đang emit một cái todo nhưng isCompleted của nó sẽ bị ngược lại vì mình checked
    this.changeStatus.emit({...this.todo, isCompleted:!this.todo.isCompleted})

  }

}

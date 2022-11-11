import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from './../../models/todo.model';
import{trigger, style,state, transition, animate} from '@angular/animations';
const fadeStrikeThroughAnimation = trigger('fadestrikeThrough', [
  state('active', style({
    fontSize: '18px',
    color:'black'
  })),
  state('completed',style({
    fontSize: '17px',
    color:'lightgrey',
    textDecoration:'line-through'
  })),
  transition('active <=> completed', [animate(250)]),
]);
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations:[fadeStrikeThroughAnimation]
})
export class TodoItemComponent implements OnInit {

  isHovered = false;
  isEditing = false;

  //con của todolist
  //sử dụng input truyền dữ liệu từ cha todo-list sang cho con todo-item
  @Input() todo:Todo;
  //output để đẩy dữ liệu từ con sang cha từ todo-item sang todolist
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo:EventEmitter<Todo> = new EventEmitter<Todo>();
  //ta có thể truyền number(id) thôi thay vì Todo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor() {
    this.todo = new Todo(0, '');
     }

  ngOnInit(): void {

  }
  public changeTodoStatus(){
    //nghĩa là mình đang emit một cái todo nhưng isCompleted của nó sẽ bị ngược lại vì mình checked
    this.changeStatus.emit({...this.todo, isCompleted:!this.todo.isCompleted})

  }
  public submitEdit(event:KeyboardEvent){
    const {keyCode} = event;
    event.preventDefault();//prevent Form to submit by default
    //nếu keycode là enter (13)
    if(keyCode===13){
       this.editTodo.emit(this.todo);
       //sau khi nhấn enter mà mình muốn thoát khỏi form
       this.isEditing=false;
    }
  }

 public removeTodo(){
      this.deleteTodo.emit(this.todo);
 }

}

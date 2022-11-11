import { Injectable } from '@angular/core';
import { Todo } from './../models/todo.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Filter } from './../models/filtering.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';
  //tổng ds todo
  private todos: Todo[]=[];
  //ds đã được filter
  private filteredTodos: Todo[]=[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //vua la observer vua la observable, có subject là có observer, day duoc gia tri ms vao stream
  //private vì ko phải ai cũng đẩy dữ liệu mới vào được chỉ có todoservice ms đẩy dữ liệu mới vào được thôi
  //này dùng để bắn dữ liệu vào stream nữa
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;
  //observable để bên ngoài stream nhận được giá trị mới đó
  //để bên ngoài nhận dữ liệu
  todo$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(private storageService: LocalStorageService) {
    //

  }
  //lấy dữ liệu từ localStrorage
  //được gọi khi app vừa chạy nên nó sẽ được gọi trong ngOnInit appComponent.ts
  fetchFromLocalStorage():void {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey)||[];
    this.filteredTodos = [...this.todos];
    //truyền dữ liệu vào stream
    //filteredTodos->displayTodosSubject:todo$
    //todos.length->lengthSubject:length$
    this.updateTodosData();
  }



  //edit, delete, add
  updateToLocalStorage():void {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    //ToDo:filter
    this.filterTodos(this.currentFilter, false);
    //truyền dữ liệu vào stream
    this.updateTodosData();
  }

  //thêm todo
  public addTodo(content:string){
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    //unshift: thêm vào đầu mang
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }


  private updateTodosData():void {
    //bắn dữ liệu vào stream
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  //khi filter thì localstorage nó ko cần update
  public filterTodos(filter: Filter, isFiltering: boolean = true):void {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active: this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed: this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      case Filter.All: this.filteredTodos = [...this.todos];
        break;
    }
    //trong trường hợp mà ta gọi hàm updateToLocalStorage thì ta không cần update data nữa
    if (isFiltering) {
      this.updateTodosData();
    }
  }

  public changeTodoStatus(id:number, isCompleted:boolean){
    //tim index theo id
    const index = this.todos.findIndex(e=>e.id===id);
    //lấy ra phần tử có index trên
    const todo = this.todos[index];
    //set lại trạng thái complete cho nó
    todo.isCompleted = isCompleted;
    //remove giá trị tại index trên và thay thế bằng todo mới
    this.todos.splice(index,1, todo);
    this.updateToLocalStorage();

  }


  public editTodo(id:number, content:string){
    //tim index theo id
    const index = this.todos.findIndex(e=>e.id===id);
    //lấy ra phần tử có index trên
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index,1, todo);
    this.updateToLocalStorage();
  }

  public deleteTodo(id:number){
    const index = this.todos.findIndex(e=>e.id===id);
    this.todos.splice(index,1);
    this.updateToLocalStorage();
  }

  //sẽ có 3 case: all false->true, one of all true and false->true, all true->false
 //cần chỉnh sửa chưa work tốt lắm
  public toggleAll(){
    this.todos = this.todos.map(todo=>{
      return {
        //spread syntax: để copy mảng hoặc object
      ...todo,
      isCompleted: this.todos.every (e=>e.isCompleted)
    }
  });
    this.updateToLocalStorage();
  }

  public clearCompleted(){
    this.todos = this.todos.filter(todo => !todo.isCompleted);
    this.updateToLocalStorage();
  }

}

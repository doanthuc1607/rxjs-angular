import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'todoApp';
  hastodo$: Observable<boolean>;
  constructor(private todoService:TodoService){
    this.hastodo$ = new Observable<boolean>();
  }
  //hàm được chạy khi component này chạy
  ngOnInit(){
    this.todoService.fetchFromLocalStorage();
    //length$: observable number
    //hastodo$: observable boolean
    //sau khi pipe map thì nó sẽ trả về obsevable của boolean giá trị nó in ra sẽ là true, or false.
    this.hastodo$ = this.todoService.length$.pipe(map(length=>length>0));
  }
}

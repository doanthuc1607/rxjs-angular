import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  public toggleAll(){
    this.todoService.toggleAll();
  }

}

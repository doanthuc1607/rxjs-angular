import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterButton, Filter } from './../../models/filtering.model';
import { TodoService } from './../../services/todo.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Todo } from './../../models/todo.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    {
      type: Filter.All, label: 'All', isActive: true
    },
    {
      type: Filter.Active, label: 'Active', isActive: false
    },
    {
      type: Filter.Completed, label: 'Completed', isActive: false
    }
  ];
  length = 0;
  hasCompleted$: Observable<boolean>;
  //tạo nguồn phát dữ liệu
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {
    this.hasCompleted$ = new Observable<boolean>;
   }

  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todo$.pipe(
      map(todos => todos.some(element => element.isCompleted)),
      takeUntil(this.destroy$));

    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(len => {
      this.length = len as number;
    });
  }


  public filter(type:Filter) {
    console.log('đã click')
    this.setActiveFilterBtn(type);
    //bắt đầu filter
    this.todoService.filterTodos(type);
  }



  private setActiveFilterBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
     btn.isActive = btn.type === type;
    });
  }

  public clearCompleted(){
    this.todoService.clearCompleted();
  }

  ngOnDestroy() {
    //bắn giá trị cho nó
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}

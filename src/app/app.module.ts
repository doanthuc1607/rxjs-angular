import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import { TodoInputComponent } from './component/todo-input/todo-input.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

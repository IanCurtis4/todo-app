import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoItemComponent } from '../app/components/todo-item/todo-item.component';
import { TodoListComponent } from '../app/components/todo-list/todo-list.component';
import { PriorityColorDirective } from '../app/directives/priority-level/priority-color.directive';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StrikeoutDirective } from './directives/strikeout/strikeout.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    PriorityColorDirective,
    FilterComponent,
    StrikeoutDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

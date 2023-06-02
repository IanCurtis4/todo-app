import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PriorityLevel } from 'src/app/models/priority-level.model';
import { TodoItem, TodoItemViewModel } from 'src/app/models/todo-item.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  constructor(private service: TodoService) {}

  @Input() item: TodoItemViewModel = {
    id: 0,
    description: "Mown lawns",
    dueDate: new Date(),
    priority: PriorityLevel.TRIVIAL,
    checked: false,
    isDue() {
      return this.isDue();
    },
  };

  @Output() itemDelete = new EventEmitter<TodoItem>();

  changeCheckedItem(item: TodoItem) {
    this.service.updateTodoItem(item).subscribe();
  }

  deleteItem(item: TodoItem) {
    this.itemDelete.emit(item);
  }

  priorityLevelName(prio: number) {
    return PriorityLevel[prio];
  }

  isDue() {
    const today = new Date();
    return new Date(this.item.dueDate as unknown as string) <= today;
  }

}


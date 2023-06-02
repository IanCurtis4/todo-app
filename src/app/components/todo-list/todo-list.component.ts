import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { TodoItem, TodoItemViewModel } from '../../models/todo-item.model';
import { FilterSettings } from "../../models/fillter-settings.model";
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: TodoItemViewModel[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: TodoService) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', [Validators.required, this.dateValidator()]],
      priority: ['', [Validators.required, Validators.min(0), Validators.max(8)]]
    });
  }

  ngOnInit(): void {
    this.service.getTodoItems().subscribe(data => {
      this.items = data.map(e => ({ ...e, isDue: () => {
        const today = new Date();
        return new Date(e.dueDate as unknown as string) <= today;
      }}));
    });
  }

  get itemsByPriority() {
    return this.items.sort((a, b) => b.priority - a.priority);
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let invalid = false;
      const value = control.value;
      if(value) {
        const dateValue = new Date(Date.parse(value));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        invalid = dateValue <= today;
      }
      return invalid ? { 'invalidDate': { value: control.value } } : null;
    };
  }

  filterItems(settings: FilterSettings) {
    this.service.getTodoItems().subscribe(data => {
      this.items = data.filter(item =>
        (!settings.description || item.description.includes(settings.description)) &&
        (!settings.priority || item.priority === settings.priority)
      ).map(e => ({ ...e, isDue: () => {
        const today = new Date();
        return new Date(e.dueDate as unknown as string) <= today;
      }}));
    });
  }

  onCreate(item: TodoItem) {
    this.service.createTodoItem(item).subscribe((newItem) => {
      this.items.push({ ...newItem, isDue: () => false });
    });
  }

  onDelete(item: TodoItem) {
    this.service.deleteTodoItem(item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.onCreate(this.form.value);
      this.form.reset();
    }
  }

}

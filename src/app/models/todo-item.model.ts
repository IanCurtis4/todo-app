import { PriorityLevel } from "./priority-level.model";

export interface TodoItem {
  id: number;
  description: string;
  dueDate: Date;
  priority: PriorityLevel;
  checked: boolean;
}

export interface TodoItemViewModel extends TodoItem {
  isDue: () => boolean;
}

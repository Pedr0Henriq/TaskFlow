import type { TaskPriority } from './task';

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;
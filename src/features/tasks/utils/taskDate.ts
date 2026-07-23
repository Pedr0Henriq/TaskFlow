import type { TaskStatus } from '../types/task';

export function formatTaskDate(date?: string): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
}

export function isTaskOverdue(
  dueDate: string | undefined,
  status: TaskStatus,
): boolean {
  if (!dueDate || status === 'completed') {
    return false;
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  return parsedDate.getTime() < Date.now();
}
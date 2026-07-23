import type { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review React Native fundamentals',
    description:
      'Review components, props, state, hooks, and the rendering lifecycle.',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-07-23T18:00:00.000Z',
    createdAt: '2026-07-21T12:00:00.000Z',
    updatedAt: '2026-07-21T12:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Implement authentication flow',
    description:
      'Add protected routes, form validation, and secure session persistence.',
    priority: 'high',
    status: 'completed',
    dueDate: '2026-07-22T18:00:00.000Z',
    createdAt: '2026-07-20T12:00:00.000Z',
    updatedAt: '2026-07-22T12:00:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Study Redux Toolkit',
    description:
      'Understand slices, reducers, selectors, thunks, and RTK Query.',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-07-25T18:00:00.000Z',
    createdAt: '2026-07-21T14:00:00.000Z',
    updatedAt: '2026-07-21T14:00:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Prepare project README',
    description:
      'Document the architecture, installation process, and technical decisions.',
    priority: 'low',
    status: 'pending',
    createdAt: '2026-07-22T09:00:00.000Z',
    updatedAt: '2026-07-22T09:00:00.000Z',
  },
];
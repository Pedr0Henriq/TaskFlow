import {
    useCallback,
    useMemo,
    useState,
} from 'react';

import { mockTasks } from '../constants/mockTasks';
import type { Task } from '../types/task';
import type { TaskFilter } from '../types/task-filter';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskFilter;
  pendingCount: number;
  completedCount: number;
  setActiveFilter: (filter: TaskFilter) => void;
  toggleTaskStatus: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] =
    useState<TaskFilter>('all');

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === activeFilter,
    );
  }, [activeFilter, tasks]);

  const pendingCount = useMemo(
    () =>
      tasks.filter((task) => task.status === 'pending').length,
    [tasks],
  );

  const completedCount = useMemo(
    () =>
      tasks.filter((task) => task.status === 'completed').length,
    [tasks],
  );

  const toggleTaskStatus = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          status:
            task.status === 'pending'
              ? 'completed'
              : 'pending',
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }, []);

  return {
    tasks,
    filteredTasks,
    activeFilter,
    pendingCount,
    completedCount,
    setActiveFilter,
    toggleTaskStatus,
    deleteTask,
  };
}
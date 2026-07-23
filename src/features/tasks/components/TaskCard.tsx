import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type {
    Task,
    TaskPriority,
} from '../types/task';

import { JSX } from 'react/jsx-runtime';
import {
    formatTaskDate,
    isTaskOverdue,
} from '../utils/taskDate';

interface TaskCardProps {
  task: Task;
  onPress?: (task: Task) => void;
  onToggleStatus: (taskId: string) => void;
  onDelete: (task: Task) => void;
}

interface PriorityConfig {
  label: string;
  containerStyle: object;
  textStyle: object;
}

function getPriorityConfig(
  priority: TaskPriority,
): PriorityConfig {
  const configs: Record<TaskPriority, PriorityConfig> = {
    low: {
      label: 'Low',
      containerStyle: styles.lowPriority,
      textStyle: styles.lowPriorityText,
    },
    medium: {
      label: 'Medium',
      containerStyle: styles.mediumPriority,
      textStyle: styles.mediumPriorityText,
    },
    high: {
      label: 'High',
      containerStyle: styles.highPriority,
      textStyle: styles.highPriorityText,
    },
  };

  return configs[priority];
}

export function TaskCard({
  task,
  onPress,
  onToggleStatus,
  onDelete,
}: TaskCardProps): JSX.Element {
  const isCompleted = task.status === 'completed';
  const formattedDate = formatTaskDate(task.dueDate);
  const overdue = isTaskOverdue(task.dueDate, task.status);
  const priority = getPriorityConfig(task.priority);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(task)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={styles.mainRow}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isCompleted }}
          hitSlop={10}
          onPress={() => onToggleStatus(task.id)}
          style={[
            styles.checkbox,
            isCompleted && styles.checkboxCompleted,
          ]}
        >
          {isCompleted ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : null}
        </Pressable>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text
              numberOfLines={2}
              style={[
                styles.title,
                isCompleted && styles.completedText,
              ]}
            >
              {task.title}
            </Text>

            <View
              style={[
                styles.priorityBadge,
                priority.containerStyle,
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority.textStyle,
                ]}
              >
                {priority.label}
              </Text>
            </View>
          </View>

          {task.description ? (
            <Text
              numberOfLines={2}
              style={[
                styles.description,
                isCompleted && styles.completedText,
              ]}
            >
              {task.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            {formattedDate ? (
              <Text
                style={[
                  styles.date,
                  overdue && styles.overdueDate,
                ]}
              >
                {overdue ? 'Overdue · ' : 'Due · '}
                {formattedDate}
              </Text>
            ) : (
              <Text style={styles.date}>No due date</Text>
            )}

            <Pressable
              accessibilityLabel={`Delete ${task.title}`}
              accessibilityRole="button"
              hitSlop={10}
              onPress={() => onDelete(task)}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  containerPressed: {
    opacity: 0.85,
  },

  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  checkbox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    borderWidth: 2,
    borderColor: '#94A3B8',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },

  checkboxCompleted: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },

  checkmark: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  content: {
    flex: 1,
    gap: 9,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  title: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },

  lowPriority: {
    backgroundColor: '#DCFCE7',
  },

  lowPriorityText: {
    color: '#15803D',
  },

  mediumPriority: {
    backgroundColor: '#FEF3C7',
  },

  mediumPriorityText: {
    color: '#B45309',
  },

  highPriority: {
    backgroundColor: '#FEE2E2',
  },

  highPriorityText: {
    color: '#B91C1C',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  date: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },

  overdueDate: {
    color: '#DC2626',
  },

  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  deleteButtonPressed: {
    opacity: 0.5,
  },

  deleteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
});
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { JSX } from 'react/jsx-runtime';
import type { TaskFilter } from '../types/task-filter';

interface EmptyTaskListProps {
  filter: TaskFilter;
}

function getEmptyStateContent(filter: TaskFilter): {
  title: string;
  description: string;
} {
  switch (filter) {
    case 'pending':
      return {
        title: 'No pending tasks',
        description:
          'You have completed everything. Great work!',
      };

    case 'completed':
      return {
        title: 'No completed tasks',
        description:
          'Complete a task and it will appear here.',
      };

    case 'all':
    default:
      return {
        title: 'No tasks yet',
        description:
          'Create your first task to start organizing your day.',
      };
  }
}

export function EmptyTaskList({
  filter,
}: EmptyTaskListProps): JSX.Element {
  const content = getEmptyStateContent(filter);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>{content.title}</Text>

      <Text style={styles.description}>
        {content.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 100,
  },

  iconContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: '#DBEAFE',
  },

  icon: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2563EB',
  },

  title: {
    marginTop: 20,
    fontSize: 21,
    fontWeight: '700',
    color: '#0F172A',
  },

  description: {
    maxWidth: 280,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },
});
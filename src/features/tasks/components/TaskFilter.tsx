import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

import { JSX } from 'react/jsx-runtime';
import type { TaskFilter as TaskFilterType } from '../types/task-filter';

interface FilterOption {
  label: string;
  value: TaskFilterType;
  count?: number;
}

interface TaskFilterProps {
  activeFilter: TaskFilterType;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
  onFilterChange: (filter: TaskFilterType) => void;
}

export function TaskFilter({
  activeFilter,
  totalCount,
  pendingCount,
  completedCount,
  onFilterChange,
}: TaskFilterProps): JSX.Element {
  const options: FilterOption[] = [
    {
      label: 'All',
      value: 'all',
      count: totalCount,
    },
    {
      label: 'Pending',
      value: 'pending',
      count: pendingCount,
    },
    {
      label: 'Completed',
      value: 'completed',
      count: completedCount,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option) => {
        const isActive = option.value === activeFilter;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onFilterChange(option.value)}
            style={({ pressed }) => [
              styles.filter,
              isActive && styles.activeFilter,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                isActive && styles.activeFilterText,
              ]}
            >
              {option.label}
            </Text>

            <Text
              style={[
                styles.count,
                isActive && styles.activeCount,
              ]}
            >
              {option.count}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 4,
  },

  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minHeight: 42,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },

  activeFilter: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },

  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  count: {
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    backgroundColor: '#E2E8F0',
  },

  activeCount: {
    color: '#1D4ED8',
    backgroundColor: '#DBEAFE',
  },

  pressed: {
    opacity: 0.75,
  },
});
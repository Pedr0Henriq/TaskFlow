import { useRouter } from 'expo-router';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAuth } from '@/features/auth/context/AuthContext';

import { EmptyTaskList } from '@/features/tasks/components/EmptyTaskList';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import { TaskFilter } from '@/features/tasks/components/TaskFilter';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import type { Task } from '@/features/tasks/types/task';
import { JSX } from 'react/jsx-runtime';

export default function HomeScreen(): JSX.Element {
  const router = useRouter();
  const { session, signOut } = useAuth();

  const {
    tasks,
    filteredTasks,
    activeFilter,
    pendingCount,
    completedCount,
    setActiveFilter,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  async function handleSignOut(): Promise<void> {
    try {
      await signOut();
    } catch {
      Alert.alert(
        'Sign out failed',
        'Unable to end the current session.',
      );
    }
  }

  function handleDeleteTask(task: Task): void {
    Alert.alert(
      'Delete task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(task.id),
        },
      ],
    );
  }

  function handleOpenTask(task: Task): void {
    console.log('Selected task:', task.id);
  }

  function handleCreateTask(): void {
    router.push('/tasks/create');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeLabel}>
              Welcome back
            </Text>

            <Text style={styles.userName}>
              {session?.user.name}
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleSignOut}
            style={({ pressed }) => [
              styles.signOutButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.signOutText}>
              Sign out
            </Text>
          </Pressable>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>
            My Tasks
          </Text>

          <Text style={styles.summaryDescription}>
            {pendingCount === 0
              ? 'You have no pending tasks.'
              : `${pendingCount} ${
                  pendingCount === 1
                    ? 'task needs'
                    : 'tasks need'
                } your attention.`}
          </Text>
        </View>

        <TaskFilter
          activeFilter={activeFilter}
          totalCount={tasks.length}
          pendingCount={pendingCount}
          completedCount={completedCount}
          onFilterChange={setActiveFilter}
        />

        <FlatList
          data={filteredTasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={handleOpenTask}
              onToggleStatus={toggleTaskStatus}
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            filteredTasks.length === 0 &&
              styles.emptyListContent,
          ]}
          ItemSeparatorComponent={TaskSeparator}
          ListEmptyComponent={
            <EmptyTaskList filter={activeFilter} />
          }
          showsVerticalScrollIndicator={false}
        />

        <Pressable
          accessibilityLabel="Create new task"
          accessibilityRole="button"
          onPress={handleCreateTask}
          style={({ pressed }) => [
            styles.floatingButton,
            pressed && styles.floatingButtonPressed,
          ]}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function TaskSeparator(): JSX.Element {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerContent: {
    flex: 1,
  },

  welcomeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },

  userName: {
    marginTop: 2,
    fontSize: 21,
    fontWeight: '700',
    color: '#0F172A',
  },

  signOutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
  },

  signOutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  summary: {
    marginTop: 30,
    marginBottom: 20,
  },

  summaryTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },

  summaryDescription: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },

  listContent: {
    paddingTop: 20,
    paddingBottom: 110,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  separator: {
    height: 12,
  },

  floatingButton: {
    position: 'absolute',
    right: 22,
    bottom: 28,
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: '#2563EB',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  floatingButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  floatingButtonText: {
    marginTop: -3,
    fontSize: 36,
    fontWeight: '300',
    color: '#FFFFFF',
  },

  pressed: {
    opacity: 0.7,
  },
});
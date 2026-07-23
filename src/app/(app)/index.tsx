import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAuth } from '@/features/auth/context/AuthContext';
import { JSX } from 'react/jsx-runtime';

export default function HomeScreen(): JSX.Element {
  const {
    session,
    signOut,
  } = useAuth();

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {session?.user.name}
          </Text>

          <Text style={styles.subtitle}>
            Your tasks will appear here.
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
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>

      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>✓</Text>

        <Text style={styles.emptyTitle}>
          No tasks yet
        </Text>

        <Text style={styles.emptyDescription}>
          Create your first task to start organizing your day.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#64748B',
  },

  signOutButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#E2E8F0',
  },

  signOutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },

  pressed: {
    opacity: 0.7,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },

  emptyIcon: {
    fontSize: 38,
    fontWeight: '700',
    color: '#2563EB',
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  emptyDescription: {
    maxWidth: 280,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },
});
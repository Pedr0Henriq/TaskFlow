import { useRouter } from 'expo-router';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { JSX } from 'react/jsx-runtime';

export default function CreateTaskScreen(): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create task
      </Text>

      <Text style={styles.description}>
        The task form will be implemented in the next step.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Go back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
  },

  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#64748B',
  },

  button: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
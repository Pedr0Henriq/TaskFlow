import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { JSX } from 'react/jsx-runtime';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = 'Loading...',
}: LoadingScreenProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
  },

  message: {
    fontSize: 16,
    color: '#475569',
  },
});
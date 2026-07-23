import { Stack } from 'expo-router';

import {
  AuthProvider,
  useAuth,
} from '@/features/auth/context/AuthContext';

import { LoadingScreen } from '@/shared/components/LoadingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { JSX } from 'react/jsx-runtime';

export default function RootLayout(): JSX.Element {
  return (
    <SafeAreaProvider>
      
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator(): JSX.Element {
  const {
    session,
    isLoadingSession,
  } = useAuth();

  if (isLoadingSession) {
    return (
      <LoadingScreen message="Restoring your session..." />
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign_in" />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
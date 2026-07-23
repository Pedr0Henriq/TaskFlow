import { Stack } from 'expo-router';
import { JSX } from 'react/jsx-runtime';

export default function AuthenticatedLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tasks/create"
        options={{
          title: 'Create task',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
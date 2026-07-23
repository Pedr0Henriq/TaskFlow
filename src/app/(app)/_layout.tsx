import { Stack } from 'expo-router';
import { JSX } from 'react/jsx-runtime';

export default function AuthenticatedLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'My Tasks',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
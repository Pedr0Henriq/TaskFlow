import * as SecureStore from 'expo-secure-store';

import type { AuthSession } from '@/features/auth/types/auth';

const SESSION_STORAGE_KEY = 'taskflow_session';

export const sessionStorage = {
  async save(session: AuthSession): Promise<void> {
    try {
      const serializedSession = JSON.stringify(session);

      await SecureStore.setItemAsync(
        SESSION_STORAGE_KEY,
        serializedSession,
      );
    } catch (error) {
      console.error('Failed to save authentication session:', error);

      throw new Error('Unable to save the authentication session.');
    }
  },

  async get(): Promise<AuthSession | null> {
    try {
      const storedSession = await SecureStore.getItemAsync(
        SESSION_STORAGE_KEY,
      );

      if (!storedSession) {
        return null;
      }

      return JSON.parse(storedSession) as AuthSession;
    } catch (error) {
      console.error('Failed to restore authentication session:', error);

      await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);

      return null;
    }
  },

  async remove(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove authentication session:', error);

      throw new Error('Unable to remove the authentication session.');
    }
  },
};
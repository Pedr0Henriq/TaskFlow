import {
    createContext,
    JSX,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { sessionStorage } from '@/shared/storage/sessionStorage';

import { authService } from '../services/authService';
import type {
    AuthContextData,
    AuthSession,
    LoginCredentials,
} from '../types/auth';

const AuthContext = createContext<AuthContextData | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    async function restoreSession(): Promise<void> {
      try {
        const storedSession = await sessionStorage.get();

        setSession(storedSession);
      } finally {
        setIsLoadingSession(false);
      }
    }

    void restoreSession();
  }, []);

  const signIn = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      const newSession = await authService.signIn(credentials);

      await sessionStorage.save(newSession);

      setSession(newSession);
    },
    [],
  );

  const signOut = useCallback(async (): Promise<void> => {
    await sessionStorage.remove();

    setSession(null);
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({
      session,
      isLoadingSession,
      signIn,
      signOut,
    }),
    [session, isLoadingSession, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
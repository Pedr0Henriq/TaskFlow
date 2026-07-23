export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  session: AuthSession | null;
  isLoadingSession: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}
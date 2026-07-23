import type {
    AuthSession,
    LoginCredentials,
} from '../types/auth';

const DEMO_EMAIL = 'pedro@taskflow.dev';
const DEMO_PASSWORD = '123456';

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const authService = {
  async signIn(
    credentials: LoginCredentials,
  ): Promise<AuthSession> {
    await delay(800);

    const normalizedEmail = credentials.email
      .trim()
      .toLowerCase();

    const hasValidCredentials =
      normalizedEmail === DEMO_EMAIL &&
      credentials.password === DEMO_PASSWORD;

    if (!hasValidCredentials) {
      throw new Error('Invalid email or password.');
    }

    return {
      accessToken: 'mock-access-token',
      user: {
        id: 'user-1',
        name: 'Pedro Lima',
        email: normalizedEmail,
      },
    };
  },
};
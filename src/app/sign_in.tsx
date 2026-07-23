import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { FormInput } from '@/features/auth/components/FormInput';
import { useAuth } from '@/features/auth/context/AuthContext';
import {
    loginSchema,
    type LoginFormData,
} from '@/features/auth/schemas/loginSchema';
import { JSX } from 'react/jsx-runtime';

export default function SignInScreen(): JSX.Element {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'pedro@taskflow.dev',
      password: '123456',
    },
  });

  async function handleSignIn(
    data: LoginFormData,
  ): Promise<void> {
    try {
      await signIn(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to sign in.';

      Alert.alert('Authentication failed', message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>TaskFlow</Text>

          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to organize your tasks and stay productive.
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormInput
                ref={field.ref}
                label="Email"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.email?.message}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormInput
                ref={field.ref}
                label="Password"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.password?.message}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                textContentType="password"
              />
            )}
          />

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={handleSubmit(handleSignIn)}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              isSubmitting && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.demoText}>
          Demo: pedro@taskflow.dev / 123456
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 32,
  },

  header: {
    gap: 8,
  },

  logo: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748B',
  },

  form: {
    gap: 18,
  },

  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  demoText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748B',
  },
});
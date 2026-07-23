import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Enter a valid email address')
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
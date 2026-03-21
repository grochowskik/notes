import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email jest wymagany' })
    .email({ message: 'Niepoprawny format email' }),
  password: z
    .string()
    .min(8, { message: 'Hasło musi mieć minimum 8 znaków' })
    .regex(/[A-Z]/, {
      message: 'Hasło musi zawierać co najmniej jedną wielką literę',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Hasło musi zawierać co najmniej jeden znak specjalny',
    })
    .regex(/\d/, { message: 'Hasło musi zawierać co najmniej jedną cyfrę' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

import { z } from 'zod';

export const dashboardSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email jest wymagany' })
    .email({ message: 'Niepoprawny format email' }),
  age: z
    .string()
    .min(1, { message: 'Podaj wiek' })
    .regex(/^\d+$/, { message: 'Wiek musi być liczbą' })
    .refine((val) => parseInt(val, 10) >= 18, {
      message: 'Musisz mieć minimum 18 lat',
    }),
});

export type DashboardFormValues = z.infer<typeof dashboardSchema>;

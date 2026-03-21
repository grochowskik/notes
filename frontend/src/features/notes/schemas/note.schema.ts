import { z } from 'zod';

export const noteAddSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export type NoteAddFormValues = z.infer<typeof noteAddSchema>;

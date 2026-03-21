'use client';

import { useCreateNote } from '@/core/api/notes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  noteAddSchema,
  type NoteAddFormValues,
} from '../schemas/noteAdd.schema';

export function useNotesAddForm(onSuccess?: () => void) {
  const { mutate } = useCreateNote();

  const methods = useForm<NoteAddFormValues>({
    resolver: zodResolver(noteAddSchema),
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: NoteAddFormValues) => {
    await mutate({ title: data.title, content: data.content });
    onSuccess?.();
  };

  return { methods, onSubmit };
}

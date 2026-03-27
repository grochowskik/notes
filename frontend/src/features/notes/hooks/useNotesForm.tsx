'use client';

import { useNoteCreate } from '@/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { noteAddSchema, type NoteAddFormValues } from '../schemas/note.schema';

export function useNotesAddForm(onSuccess?: () => void) {
  const { mutate } = useNoteCreate();

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
    methods.reset();
    onSuccess?.();
  };

  return { methods, onSubmit };
}

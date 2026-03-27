import type { Note, NoteListResponse } from '@/core/api/notes/types';
import { http, HttpResponse } from 'msw';

export const mockNote: Note = {
  id: 'note-1',
  title: 'Test Note',
  content: 'This is a test note.',
  version: 1,
};

export const mockNoteListResponse: NoteListResponse = {
  notes: [mockNote],
  pagination: {
    page: 1,
    page_size: 20,
    total_records: 10,
    total_pages: 1,
  },
};

export const notesHandlers = [
  http.post('/api/notes/list', () =>
    HttpResponse.json({ result: mockNoteListResponse })
  ),
  http.post('/api/notes/create', () => HttpResponse.json({ result: mockNote })),
  http.post('/api/notes/update', () =>
    HttpResponse.json({ result: { ...mockNote, status: 'completed' as const } })
  ),
  http.post('/api/notes/cancel', () =>
    HttpResponse.json({ result: { ...mockNote, status: 'cancelled' as const } })
  ),
];

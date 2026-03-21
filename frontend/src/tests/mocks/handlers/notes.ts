import { http, HttpResponse } from 'msw';
import type { Note, NoteListResponse } from '@/core/api/notes/types';

export const mockNote: Note = {
  id: 'note-1',
  amount: 1000,
  currency: 'PLN',
  status: 'pending',
  type: 'deposit',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  description: 'Test note',
};

export const mockNoteListResponse: NoteListResponse = {
  notes: [mockNote],
  total: 1,
  page: 1,
  limit: 20,
  hasMore: false,
};

export const notesHandlers = [
  http.post('/api/notes/list', () =>
    HttpResponse.json({ result: mockNoteListResponse }),
  ),
  http.post('/api/notes/create', () =>
    HttpResponse.json({ result: mockNote }),
  ),
  http.post('/api/notes/update', () =>
    HttpResponse.json({ result: { ...mockNote, status: 'completed' as const } }),
  ),
  http.post('/api/notes/cancel', () =>
    HttpResponse.json({ result: { ...mockNote, status: 'cancelled' as const } }),
  ),
];

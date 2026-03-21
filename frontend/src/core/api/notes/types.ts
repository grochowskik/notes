import { Pagination } from '@/core';

export interface Note {
  id: string;
  title: string;
  content: string;
  version: number;
}

export interface NoteListRequest {
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface NoteListResponse {
  notes: Note[];
  pagination: Pagination;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  noteId: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface CancelNoteRequest {
  noteId: string;
}

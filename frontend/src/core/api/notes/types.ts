import { type Filters, type Pagination } from '@/core';

export interface Note {
  id: string;
  title: string;
  content: string;
  version: number;
}

export interface NoteListRequest {
  title?: string;
  filters?: Filters;
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
  id: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface DeleteNoteRequest {
  id: string;
}

export interface Note {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  type: 'deposit' | 'withdrawal' | 'transfer';
  createdAt: string;
  updatedAt: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface NoteListRequest {
  page?: number;
  limit?: number;
  status?: Note['status'];
  type?: Note['type'];
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface NoteListResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CreateNoteRequest {
  amount: number;
  currency: string;
  type: Note['type'];
  description?: string;
  recipientId?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateNoteRequest {
  noteId: string;
  status?: Note['status'];
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface CancelNoteRequest {
  noteId: string;
}

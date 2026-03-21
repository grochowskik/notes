import { useDelete, useGet, usePatch, usePost } from '@/core';
import {
  CancelNoteRequest,
  CreateNoteRequest,
  Note,
  NoteListRequest,
  NoteListResponse,
  UpdateNoteRequest,
} from './types';

export const useNote = (params?: NoteListRequest) => {
  return useGet<NoteListResponse>('/note', params);
};

export const useNotesList = (params?: NoteListRequest) => {
  return useGet<NoteListResponse>('/notes_list', params);
};

export const useCreateNote = () => {
  return usePost<CreateNoteRequest, Note>('/notes_create', {
    invalidateQueriesList: ['/notes_list'],
  });
};

export const useUpdateNote = () => {
  return usePatch<UpdateNoteRequest, Note>('/notes_update', {
    invalidateQueriesList: ['/notes_list', '/note'],
  });
};

export const useCancelNote = () => {
  return useDelete<CancelNoteRequest, Note>('/notes_cancel', {
    invalidateQueriesList: ['/notes_list', '/note'],
  });
};

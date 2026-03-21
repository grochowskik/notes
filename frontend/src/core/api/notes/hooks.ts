import { useDelete, useGet, usePatch, usePost } from '@/core';
import {
  CreateNoteRequest,
  DeleteNoteRequest,
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

export const useNoteCreate = () => {
  return usePost<CreateNoteRequest, Note>('/notes_create', {
    invalidateQueriesList: ['/notes_list'],
  });
};

export const useNoteUpdate = () => {
  return usePatch<UpdateNoteRequest, Note>('/notes_update', {
    invalidateQueriesList: ['/notes_list', '/note'],
  });
};

export const useNoteDelete = () => {
  return useDelete<DeleteNoteRequest, Note>('/notes_delete', {
    invalidateQueriesList: ['/notes_list', '/note'],
  });
};

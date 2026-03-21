import { setupServer } from 'msw/node';
import { notesHandlers } from './handlers/notes';

export const server = setupServer(...notesHandlers);

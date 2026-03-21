'use client';

import { Button, Section } from '@/ui';
import { useState } from 'react';
import { NotesAddModal } from './NoteAddModal';
import { NotesTable } from './NotesTable';

export function NotesSection() {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Section title="Notes">
      <NotesTable />
      <NotesAddModal show={show} onClose={handleClose} />
      <Button label="Add Note" onClick={handleOpen} variant="primary" />
    </Section>
  );
}

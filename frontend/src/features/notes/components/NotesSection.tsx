'use client';

import { Button, Section } from '@/ui';
import { NotesTable } from './NotesTable';
import { NotesAddModal } from './NoteAddModal';
import { useState } from 'react';

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

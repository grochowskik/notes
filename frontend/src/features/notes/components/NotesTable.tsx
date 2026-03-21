'use client';

import { useNotesList } from '@/core/api/notes/hooks';
import { Table } from '@/ui';

export function NotesTable() {
  const { data } = useNotesList();
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.notes.map((note) => (
          <Table.Row key={note.id}>
            <Table.Cell>{note.title}</Table.Cell>
            <Table.Cell>{note.content}</Table.Cell>
            <Table.Cell>{note.version}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
